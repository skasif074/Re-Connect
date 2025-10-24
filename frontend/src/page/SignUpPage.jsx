import React, { useState } from 'react'
import { BotMessageSquare } from "lucide-react"
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios.js'
import useAuthUser from '../lib/hooks/useAuthUser';


const SignUpPage = () => {
  const queryClient = useQueryClient()
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  
  const signup = async () => {
    const res = await axiosInstance.post("/auth/signup", signupData)
    return res.data
  }


  const { mutate: signupMutation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
      toast.success("Account Activated successfully!")
    },
  })


  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation() 
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="cup-cake">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto
      bg-base-100 rounded-xl shadow-lg overflow-hidden'>

        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <BotMessageSquare className="size-9 text-primary" />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary
            to-secondary tracking-wider'>
              Re-Connect
            </span>
          </div>

          {error && (
            <div className='alert alert-error mb-4'>
              <span>
                {error.response?.data?.message || "Something went wrong!"}
              </span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Create an Account</h2>
                  <p className='text-sm opacity-70'>
                    Join Re-Connect
                  </p>
                </div>

                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder='Name'
                      className='input input-bordered w-full'
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder='Email'
                      className='input input-bordered w-full'
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder='Password'
                      className='input input-bordered w-full'
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button className='btn btn-primary w-full' type='submit'>
                  {isPending ? (
                    <>
                    <span className='loading loading-spinner loading-xs'>Activating...</span>
                    </>
                  ) : "Activate Account"}
                </button>

                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Already a member?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="./i.png" alt="Language connection illustration" className='w-full h-full' />
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Re-Connect World Wide</h2>
              <p className='opacity-70'>
                Re-Connect with your Friends...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
