import { z } from "zod";
import { GrandmasterResponseSchema } from "../schemas/chess";
import {
  validateSchema,
  ApiValidationError,
  createApiError,
} from "../utils/validation";

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
  async request<T>(
    endpoint: string,
    responseSchema: z.ZodSchema<T>,
    options: RequestInit = {}
  ): Promise<T> {
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

      const data = await response.json();
      return validateSchema(responseSchema, data, `API Response (${endpoint})`);
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
    const response = await apiClient.request(
      "/titled/GM",
      GrandmasterResponseSchema
    );
    return response.players;
  }
}
