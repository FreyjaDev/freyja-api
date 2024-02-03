import { z } from 'zod';

export const createRatingTypeSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type CreateRatingTypeDto = z.infer<typeof createRatingTypeSchema>;
