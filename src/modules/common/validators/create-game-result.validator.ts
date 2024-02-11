import { z } from 'zod';

export const createGameResultSchema = z.object({
  loserId: z.string(),
  winnerId: z.string(),
});

export type CreateGameResultDto = z.infer<typeof createGameResultSchema>;
