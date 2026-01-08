import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { ShipmentQueryDto } from './dto/shipment.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async findAll(query: ShipmentQueryDto) {
    // 1. Destructure the query for easy access
    // Note: Zod defaults (page: 1, limit: 10, etc.) are already applied here
    const { page, limit, sortOrder, sortBy, status, trackingNumber } = query;

    // 2. Calculate the skip (offset)
    const skip = (page - 1) * limit;

    // 3. Build the dynamic 'where' object
    const where: FindOptionsWhere<Shipment> = {};

    if (status) {
      where.status = status;
    }

    if (trackingNumber) {
      // Using ILike for partial, case-insensitive matching
      where.trackingNumber = ILike(`%${trackingNumber}%`);
    }

    // 4. Query the database
    // findAndCount returns [items, totalCount]
    const [data, totalItems] = await this.shipmentRepository.findAndCount({
      where,
      order: {
        [sortBy]: sortOrder,
      },
      take: limit,
      skip: skip,
    });

    // 5. Calculate metadata
    const totalPages = Math.ceil(totalItems / limit);

    // 6. Return the paginated response
    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
  async findOne(id: string): Promise<Shipment> {
    // We use the findOneBy method for a direct primary key lookup
    const shipment = await this.shipmentRepository.findOneBy({ id });

    // If the database returns null, we trigger a 404 response
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID "${id}" not found`);
    }

    return shipment;
  }
}
