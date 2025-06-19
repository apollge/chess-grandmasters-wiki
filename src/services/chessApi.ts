import { ChessApiService } from "./apiClient";

// Legacy API functions for backward compatibility
export const fetchGrandmasters = () => ChessApiService.getGrandmasters();

export const fetchPlayerProfile = (username: string) =>
  ChessApiService.getPlayerProfile(username);

export const fetchPlayerData = (username: string) =>
  ChessApiService.getPlayerData({ username, include_stats: true });

// Export the service class for direct use
export { ChessApiService } from "./apiClient";
