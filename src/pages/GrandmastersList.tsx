import { useQuery } from "@tanstack/react-query";
import { GrandmasterCardSkeleton } from "../components/LoadingSkeleton";
import { ErrorMessage } from "../components/ErrorMessage";
import { fetchGrandmasters } from "../services/chessApi";

export const GrandmastersList = () => {
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

  if (isLoading) {
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
      {grandmasters.map((grandmaster) => (
        <div key={grandmaster}>{grandmaster}</div>
      ))}
    </div>
  );
};
