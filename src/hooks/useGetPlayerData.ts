import { useQuery } from "@tanstack/react-query";
import { fetchPlayerData } from "../services/chessApi";

export const useGetPlayerData = (username?: string) => {
  return useQuery({
    queryKey: ["player", username],
    queryFn: () => fetchPlayerData(username ?? ""),
    enabled: !!username,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
