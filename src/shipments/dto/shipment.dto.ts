import { z } from 'zod';
import { PaginationSchema } from '../../common/schemas/pagination.schema';
import { ShipmentStatus } from '../../common/constants/shipment.constants';

// We merge the common pagination with shipment-specific filters
export const ShipmentQuerySchema = PaginationSchema.merge(
  z.object({
    status: z.nativeEnum(ShipmentStatus).optional(),
    trackingNumber: z.string().optional(),
    sortBy: z
      .enum(['createdAt', 'status', 'trackingNumber'])
      .default('createdAt'),
  }),
);

export type ShipmentQueryDto = z.infer<typeof ShipmentQuerySchema>;
