import { z } from "zod";

// Base schemas for common types
export const UsernameSchema = z
  .string()
  .min(1)
  .max(50)
  .regex(/^[a-zA-Z0-9_-]+$/);

// Chess.com API Response Schemas
export const GrandmasterResponseSchema = z.object({
  players: z.array(UsernameSchema),
});

// Error Response Schema
export const ApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
  }),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;
