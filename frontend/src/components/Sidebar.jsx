import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import useAuthUser from "../lib/hooks/useAuthUser";
import { UsersIcon, HomeIcon, BellIcon, BotMessageSquare } from "lucide-react";
import { getUserFriends } from "../lib/api";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const [showFriends, setShowFriends] = useState(false);
  const [friends, setFriends] = useState([]);

  const toggleFriends = async () => {
    setShowFriends(prev => !prev);

    if (!showFriends && friends.length === 0) {
      try {
        const friendsList = await getUserFriends();
        setFriends(friendsList);
      } catch (err) {
        console.error("Failed to fetch friends:", err);
      }
    }
  };

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <BotMessageSquare className="size-9 text-primary" />
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Re-Connect
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        {/* Re-Connections Toggle */}
        <button
          onClick={toggleFriends}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Re-Connections</span>
        </button>

        {/* Scrollable friends list */}
        {showFriends && (
          <div className="ml-6 flex flex-col space-y-1 max-h-[40vh] overflow-y-auto">
            {friends.length > 0 ? (
              friends.map(friend => (
                <Link
                  key={friend._id}
                  to={`/chat/${friend._id}`}
                  className="btn btn-ghost justify-start w-full gap-3 px-3 normal-case text-sm truncate"
                >
                  {friend.fullName}
                </Link>
              ))
            ) : (
              <p className="text-xs text-gray-500 ml-2">No friends found</p>
            )}
          </div>
        )}

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profile} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Re-Connected
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
