import { z } from 'zod';
import { PaginationSchema } from '../../common/schemas/pagination.schema';
import { ShipmentStatus } from '../../common/constants/shipment.constants';

export const ShipmentQuerySchema = PaginationSchema.merge(
  z.object({
    // 1. Allow status to be an enum OR an empty string (which we treat as undefined)
    status: z
      .nativeEnum(ShipmentStatus)
      .optional()
      .or(z.literal(''))
      .transform((val) => (val === '' ? undefined : val)),

    // 2. Trim whitespace and turn empty strings into undefined
    trackingNumber: z
      .string()
      .trim()
      .optional()
      .transform((val) => (val === '' ? undefined : val)),

    sortBy: z
      .enum(['createdAt', 'status', 'trackingNumber'])
      .default('createdAt'),
  }),
);

export type ShipmentQueryDto = z.infer<typeof ShipmentQuerySchema>;