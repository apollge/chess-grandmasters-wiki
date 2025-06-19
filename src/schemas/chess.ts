import { z } from "zod";

// Base schemas for common types
export const UsernameSchema = z
  .string()
  .min(1)
  .max(50)
  .regex(/^[a-zA-Z0-9_-]+$/);
export const RatingSchema = z.number().int().min(0).max(4000);
export const CountryCodeSchema = z
  .string()
  .length(2)
  .regex(/^[A-Z]{2}$/);
export const TimestampSchema = z.number().int().positive();

// Chess.com API Response Schemas
export const GrandmasterResponseSchema = z.object({
  players: z.array(UsernameSchema),
});

export const PlayerProfileSchema = z.object({
  "@id": z.string().url().optional(),
  avatar: z.string().url().nullable().optional(),
  country: CountryCodeSchema.optional(),
  fide: RatingSchema.optional(),
  followers: z.number().int().min(0).default(0).optional(),
  is_streamer: z.boolean(),
  joined: TimestampSchema.default(0).optional(),
  last_online: TimestampSchema.default(0).optional(),
  location: z.string().optional(),
  name: z.string().optional(),
  player_id: z.number().int().positive().default(0).optional(),
  status: z
    .enum(["basic", "premium", "mod", "staff"])
    .default("basic")
    .nullable()
    .optional(),
  title: z.string().optional(),
  twitch_url: z.string().url().optional(),
  url: z.string().url().default("").optional(),
  username: UsernameSchema,
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
export type PlayerProfile = z.infer<typeof PlayerProfileSchema> & {
  avatar?: string | null;
};
