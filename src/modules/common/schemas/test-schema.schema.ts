import { SnowflakeId } from '@freyja-models/freyja-models';
import { z } from 'zod';

export const testSchema = z.object({
  name: z.string().transform((val) => SnowflakeId.of(val)),
});

export type TestDto = z.infer<typeof testSchema>;
