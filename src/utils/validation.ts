import { z } from "zod";
import type { ApiError } from "../schemas/chess";

export class ValidationError extends Error {
  constructor(public issues: z.ZodIssue[], message = "Validation failed") {
    super(message);
    this.name = "ValidationError";
  }
}

export class ApiValidationError extends Error {
  constructor(
    public statusCode: number,
    public error: ApiError,
    message?: string
  ) {
    super(message || error.error.message);
    this.name = "ApiValidationError";
  }
}

/**
 * Validates data against a Zod schema and returns typed result
 */
export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        error.issues,
        `${context ? `${context}: ` : ""}Validation failed`
      );
    }
    throw error;
  }
}

/**
 * Safely validates data and returns result with error handling
 */
export function safeValidateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: ValidationError } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: new ValidationError(error.issues),
      };
    }
    return {
      success: false,
      error: new ValidationError([], "Unknown validation error"),
    };
  }
}

/**
 * Formats Zod validation errors for API responses
 */
export function formatValidationError(error: ValidationError): ApiError {
  const details = error.issues.reduce((acc, issue) => {
    const path = issue.path.join(".");
    acc[path] = {
      message: issue.message,
      code: issue.code,
      expected: "expected" in issue ? issue.expected : undefined,
      received: "received" in issue ? issue.received : undefined,
    };
    return acc;
  }, {} as Record<string, unknown>);

  return {
    error: {
      code: "VALIDATION_ERROR",
      message: "Request validation failed",
      details,
    },
  };
}

/**
 * Creates a standardized API error response
 */
export function createApiError(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiError {
  return {
    error: {
      code,
      message,
      details,
    },
  };
}
