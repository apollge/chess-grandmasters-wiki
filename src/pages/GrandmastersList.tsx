import { useQuery } from "@tanstack/react-query";
import { GrandmasterCardSkeleton } from "../components/LoadingSkeleton";
import { ErrorMessage } from "../components/ErrorMessage";
import { fetchGrandmasters } from "../services/chessApi";
import { GrandmasterCard } from "../components/GrandmasterCard";
import { useCallback, useMemo, useState } from "react";
import { fetchPlayerProfile } from "../services/chessApi";
import type { PlayerProfile } from "../schemas/chess";
import { useDebounce } from "../hooks/useDebounce";
import { SearchBar } from "../components/SearchBar";

const ITEMS_PER_PAGE = 20;

export const GrandmastersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const onSetSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Fetch grandmasters list
  const {
    data: grandmasters = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["grandmasters"],
    queryFn: fetchGrandmasters,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Filter grandmasters based on search term
  const filteredGrandmasters = useMemo(() => {
    if (!debouncedSearchTerm) {
      return grandmasters;
    }

    return grandmasters.filter((username) =>
      username.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [grandmasters, debouncedSearchTerm]);

  // Paginate filtered results
  const paginatedGrandmasters = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGrandmasters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredGrandmasters, currentPage]);

  const totalPages = Math.ceil(filteredGrandmasters.length / ITEMS_PER_PAGE);

  // Fetch profiles for current page
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ["profiles", paginatedGrandmasters],
    queryFn: async () => {
      const profilePromises = paginatedGrandmasters.map(async (username) => {
        try {
          return await fetchPlayerProfile(username);
        } catch (error) {
          console.error(error);
          // Return a minimal profile object for failed requests
          return {
            "@id": "",
            followers: 0,
            is_streamer: false,
            joined: 0,
            last_online: 0,
            player_id: 0,
            status: "basic",
            url: "",
            username,
          } as PlayerProfile;
        }
      });
      return Promise.all(profilePromises);
    },
    enabled: paginatedGrandmasters.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading || profilesLoading) {
    return (
      <div className="space-y-6">
        <div className="mx-auto max-w-2xl">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <GrandmasterCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load grandmasters list. Please check your internet connection and try again."
        onRetry={() => refetch()}
        className="min-h-[400px]"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <div className="space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={onSetSearchTerm}
          placeholder="Search grandmasters by username..."
          className="mx-auto max-w-2xl"
        />

        <div className="text-sm text-center text-gray-600 dark:text-gray-400">
          {searchTerm ? (
            <>
              Showing {filteredGrandmasters.length} of {grandmasters.length}{" "}
              grandmasters
            </>
          ) : (
            <>Total grandmasters: {grandmasters.length.toLocaleString()}</>
          )}
        </div>
      </div>

      {/* Results */}
      {filteredGrandmasters.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No grandmasters found matching "{searchTerm}"
          </p>
        </div>
      ) : (
        <>
          {/* Grandmasters Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile, index) => (
              <GrandmasterCard
                key={profile.username || index}
                profile={profile}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center py-8 space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg transition-colors duration-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg transition-colors duration-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
