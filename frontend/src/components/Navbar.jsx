import React from 'react';
import useAuthUser from '../lib/hooks/useAuthUser.js';
import { useLocation, Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api.js';
import { BotMessageSquare, BellIcon, LogOutIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-end w-full'>
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <BotMessageSquare className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Re-Connect
                </span>
              </Link>
            </div>
          )}

          <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          {/* Profile Avatar clickable to go to profile edit */}
          <Link to="/profile/edit" className='avatar'>
            <div className='w-9 rounded-full cursor-pointer'>
              <img src={authUser?.profile} alt="User Avatar" rel='noreferrer' />
            </div>
          </Link>

          {/* Logout Button */}
          <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
            <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
