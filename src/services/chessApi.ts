import { ChessApiService } from "./apiClient";

// Legacy API functions for backward compatibility
export const fetchGrandmasters = () => ChessApiService.getGrandmasters();

export const fetchPlayerProfile = (username: string) =>
  ChessApiService.getPlayerProfile(username);

// Export the service class for direct use
export { ChessApiService } from "./apiClient";
