import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Crown,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  Trophy,
  Target,
  Zap,
  Clock3,
} from "lucide-react";
import { fetchPlayerData } from "../services/chessApi";
import { ErrorMessage } from "../components/ErrorMessage";
import { ProfileSkeleton } from "../components/LoadingSkeleton";
import { LastOnlineCounter } from "../components/LastOnlineCounter";
import { formatDate } from "../utils/format";

export const GrandmasterProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["player", username],
    queryFn: () => fetchPlayerData(username!),
    enabled: !!username,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !data?.profile) {
    return (
      <ErrorMessage
        message={`Failed to load profile for ${username}. The player might not exist or there was a network error.`}
        onRetry={() => refetch()}
        className="min-h-[400px]"
      />
    );
  }

  const { profile, stats } = data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatRating = (gameType: string, data: any) => {
    if (!data) {
      return null;
    }

    return (
      <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
        <h4 className="flex items-center mb-2 font-semibold text-gray-900 dark:text-white">
          {gameType === "rapid" && <Clock3 className="mr-2 w-4 h-4" />}
          {gameType === "blitz" && <Zap className="mr-2 w-4 h-4" />}
          {gameType === "bullet" && <Target className="mr-2 w-4 h-4" />}
          {gameType.charAt(0).toUpperCase() + gameType.slice(1)}
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Current:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data.last?.rating || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Best:</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {data.best?.rating || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Record:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data.record
                ? `${data.record.win}W / ${data.record.loss}L / ${data.record.draw}D`
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto space-y-8 max-w-6xl">
      {/* Profile Header */}
      <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col items-start -mt-16 space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <img
                src={
                  profile.avatar && profile.avatar !== null
                    ? profile.avatar
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile.username
                      )}&size=128&background=10b981&color=ffffff`
                }
                alt={profile.username}
                className="object-cover w-32 h-32 bg-white rounded-full border-4 border-white dark:border-gray-800"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.username
                  )}&size=128&background=10b981&color=ffffff`;
                }}
              />
            </div>

            <div className="flex-1 md:mt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center mb-2 space-x-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {profile.name || profile.username}
                    </h1>
                    {profile.title && (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-lg dark:bg-amber-900 dark:text-amber-200">
                        <Crown className="mr-1 w-4 h-4" />
                        {profile.title}
                      </span>
                    )}
                  </div>
                  <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
                    @{profile.username}
                  </p>
                  <LastOnlineCounter
                    lastOnlineTimestamp={profile.last_online ?? 0}
                  />
                </div>

                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 mt-4 font-medium text-white bg-emerald-600 rounded-lg transition-colors duration-200 hover:bg-emerald-700 md:mt-0"
                >
                  View on Chess.com
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Profile Information
            </h3>
            <div className="space-y-4">
              {profile.location && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {profile.location}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Joined {formatDate(profile.joined ?? 0)}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {profile.followers?.toLocaleString()} followers
                </span>
              </div>

              {profile.fide && (
                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    FIDE Rating: {profile.fide}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    profile.status === "premium"
                      ? "bg-amber-400"
                      : "bg-gray-400"
                  }`}
                />
                <span className="text-gray-700 capitalize dark:text-gray-300">
                  {profile.status} Member
                </span>
              </div>

              {profile.is_streamer && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Streamer
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Game Statistics */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
              Game Statistics
            </h3>

            {stats ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {stats.chess_rapid && formatRating("rapid", stats.chess_rapid)}
                {stats.chess_blitz && formatRating("blitz", stats.chess_blitz)}
                {stats.chess_bullet &&
                  formatRating("bullet", stats.chess_bullet)}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <Trophy className="mx-auto mb-2 w-12 h-12 opacity-50" />
                <p>No game statistics available</p>
                <p className="text-sm">
                  This player might not have played rated games recently
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
