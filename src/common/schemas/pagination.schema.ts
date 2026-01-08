import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});

// We can export this type for general use
export type PaginationDto = z.infer<typeof PaginationSchema>;
