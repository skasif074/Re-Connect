import React, { useState } from 'react';
import useAuthUser from '../lib/hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CameraIcon, ShuffleIcon, MapPinIcon, BotMessageSquare, LoaderIcon } from 'lucide-react';
import { completeOnboarding } from '../lib/api.js'; 
import { LANGUAGES } from "../constants/index.js";

const OnBoardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  
const [formState, setFormState] = useState({
  fullName: authUser?.fullName || "",
  bio: authUser?.bio || "",
  nativeLanguage: authUser?.nativeLanguage || "english",
  learningLanguage: authUser?.learningLanguage || "english",
  location: authUser?.location || "",
  profile: authUser?.profile || "",
});
  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await completeOnboarding(formData);
      return res.data || res; 
    },
    onSuccess: (data) => {
      console.log("Onboarding success:", data);
      toast.success("You are ready to Re-Connect");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error("Onboarding error:", error);
      toast.error(error.response?.data?.message || "Onboarding failed");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
  const seed = crypto.randomUUID();

  const randomAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`;

  setFormState((prev) => ({
    ...prev,
    profile: randomAvatar,
  }));

  toast.success("Profile-Pic Generation Successful");
};

return (
  <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
    <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
      <div className="card-body p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
              {formState.profile ? (
                <img
                  src={formState.profile}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleRandomAvatar}
              className="btn btn-accent"
            >
              <ShuffleIcon className="size-4 mr-2" />
              Generate Random Avatar
            </button>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  fullName: e.target.value,
                })
              }
              className="input input-bordered w-full"
              placeholder="Your Full Name"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  bio: e.target.value,
                })
              }
              className="textarea textarea-bordered h-24"
              placeholder="Tell others about yourself"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>

            <div className="relative">
              <MapPinIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />

              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    location: e.target.value,
                  })
                }
                className="input input-bordered w-full pl-10"
                placeholder="Your Location"
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={isPending}
            type="submit"
          >
            {!isPending ? (
              <>
                <BotMessageSquare className="size-5 mr-2" />
                Activate
              </>
            ) : (
              <>
                <LoaderIcon className="animate-spin size-5 mr-2" />
                Activating...
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default OnBoardingPage;
