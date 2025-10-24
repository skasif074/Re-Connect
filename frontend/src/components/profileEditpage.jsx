import React, { useState } from 'react';
import useAuthUser from '../lib/hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  CameraIcon,
  ShuffleIcon,
  MapPinIcon,
  BotMessageSquare,
  LoaderIcon,
} from 'lucide-react';
import { completeOnboarding } from '../lib/api.js'; 
import { LANGUAGES } from '../constants/index.js';

const ProfileEditPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profile: authUser?.profile || ""
  });

  const { mutate: editProfileMutation, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await completeOnboarding(formData); // same API updates profile
      return res.data || res;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
      console.error(error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfileMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profile: randomAvatar });
    toast.success("Random Profile Picture Generated!");
  };

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
            Edit Your Profile
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Picture */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profile ? (
                  <img
                    src={formState.profile}
                    alt="Profile Preview"
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40' />
                  </div>
                )}
              </div>
              <button
                type='button'
                onClick={handleRandomAvatar}
                className='btn btn-accent flex items-center gap-2'
              >
                <ShuffleIcon className='size-4' />
                Generate Random
              </button>
            </div>

            {/* Full Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input
                type='text'
                name='fullName'
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className='input input-bordered w-full'
                placeholder='Your Full Name'
              />
            </div>

            {/* Bio */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea
                name='bio'
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className='textarea textarea-bordered h-24'
                placeholder='Tell others about yourself and your language learning goals'
              />
            </div>

            {/* Languages */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({ ...formState, nativeLanguage: e.target.value })
                  }
                  className='select select-bordered w-full'
                >
                  <option value=''>Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name='learningLanguage'
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({ ...formState, learningLanguage: e.target.value })
                  }
                  className='select select-bordered w-full'
                >
                  <option value=''>Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70' />
                <input
                  type='text'
                  name='location'
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className='input input-bordered w-full pl-10'
                  placeholder='Location'
                />
              </div>
            </div>

            {/* Submit */}
            <button
              className='btn btn-primary w-full flex items-center justify-center gap-2'
              disabled={isPending}
              type='submit'
            >
              {isPending ? (
                <>
                  <LoaderIcon className='animate-spin size-5' />
                  Saving...
                </>
              ) : (
                <>
                  <BotMessageSquare className='size-5' />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
