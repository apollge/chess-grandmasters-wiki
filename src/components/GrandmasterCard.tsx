import React from "react";
import { Link } from "react-router-dom";
import { Crown, MapPin, Calendar, Users } from "lucide-react";
import type { PlayerProfile } from "../schemas/chess";
import { formatDate, formatLastOnline } from "../utils/format";

interface GrandmasterCardProps {
  profile: PlayerProfile;
}

export const GrandmasterCard: React.FC<GrandmasterCardProps> = ({
  profile,
}) => {
  return (
    <Link
      to={`/player/${profile.username}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
               border border-gray-200 dark:border-gray-700 transition-all duration-200
               hover:scale-[1.02] hover:border-emerald-300 dark:hover:border-emerald-600"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              src={
                profile.avatar && profile.avatar !== null
                  ? profile.avatar
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.username
                    )}&size=64&background=10b981&color=ffffff`
              }
              alt={profile.username}
              className="object-cover w-16 h-16 rounded-full border-2 border-emerald-200 dark:border-emerald-700"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.username
                )}&size=64&background=10b981&color=ffffff`;
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2 space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate dark:text-white">
                {profile.name || profile.username}
              </h3>
              {profile.title && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded-md dark:bg-amber-900 dark:text-amber-200">
                  <Crown className="mr-1 w-3 h-3" />
                  {profile.title}
                </span>
              )}
            </div>

            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              @{profile.username}
            </p>

            <div className="flex flex-wrap items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              {profile.location && (
                <div className="flex items-center">
                  <MapPin className="mr-1 w-3 h-3" />
                  {profile.location}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="mr-1 w-3 h-3" />
                Joined {formatDate(profile.joined ?? 0)}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 w-3 h-3" />
                {profile.followers?.toLocaleString()} followers
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Last online: {formatLastOnline(profile.last_online ?? 0)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
