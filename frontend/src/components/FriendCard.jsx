//import { Link } from "react-router";
// import { LANGUAGE_TO_FLAG } from "../constants"; // Commented out since flags are hidden

import { Link } from "react-router-dom"; // Note: Changed to react-router-dom if using v6+

const FriendCard = ({ friend }) => {
  return (
    <div className="card relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300 group">
      
      {/* Neon glowing ambient orbs in the background */}
      <div className="absolute -z-10 w-24 h-24 bg-fuchsia-500/30 rounded-full blur-2xl -top-6 -left-6 group-hover:bg-fuchsia-500/50 transition-all duration-500"></div>
      <div className="absolute -z-10 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl -bottom-6 -right-6 group-hover:bg-purple-500/50 transition-all duration-500"></div>

      <div className="card-body p-4 z-10 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 ring ring-fuchsia-500/50 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
            <img src={friend.profile} alt={friend.fullName} className="rounded-full" />
          </div>
          <h3 className="font-semibold truncate text-lg tracking-wide drop-shadow-md">
            {friend.fullName}
          </h3>
        </div>

        {/* Language Section Completely Removed */}

        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-sm mt-2 border border-fuchsia-500/50 bg-transparent text-fuchsia-200 hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.8)] transition-all duration-300 w-full"
        >
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

/* // Commented out the flag helper function safely
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
*/