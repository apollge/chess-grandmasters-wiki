import { z } from "zod";
import {
  GrandmasterResponseSchema,
  PlayerProfileSchema,
} from "../schemas/chess";
import { ApiValidationError, createApiError } from "../utils/validation";

const BASE_URL = "https://api.chess.com/pub";

/**
 * Generic API client with Zod validation
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Makes a validated API request
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const apiError = createApiError(
          `HTTP_${response.status}`,
          `Request failed: ${response.statusText}`,
          { status: response.status, ...errorData }
        );
        throw new ApiValidationError(response.status, apiError);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiValidationError) {
        throw error;
      }

      // Handle network errors
      const apiError = createApiError(
        "NETWORK_ERROR",
        error instanceof Error ? error.message : "Network request failed"
      );
      throw new ApiValidationError(500, apiError);
    }
  }
}

const apiClient = new ApiClient(BASE_URL);

/**
 * Chess.com API service with Zod validation
 */
export class ChessApiService {
  /**
   * Fetch all grandmasters with validation
   */
  static async getGrandmasters(): Promise<string[]> {
    const response = await apiClient.request("/titled/GM");
    return GrandmasterResponseSchema.safeParse(response).data?.players ?? [];
  }

  /**
   * Fetch player profile with validation
   */
  static async getPlayerProfile(
    username: string
  ): Promise<z.infer<typeof PlayerProfileSchema>> {
    return apiClient.request(`/player/${username.toLowerCase()}`);
  }
}
