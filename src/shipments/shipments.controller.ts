import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { type ShipmentQueryDto, ShipmentQuerySchema } from './dto/shipment.dto';
import { ZodValidationPipe } from '../common/pipes/ZodValidation.pipe';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) { }

  /**
   * GET /shipments
   * Handles pagination, sorting, and filtering
   */
  @Get()
  async findAll(
    @Query(new ZodValidationPipe(ShipmentQuerySchema)) query: ShipmentQueryDto
  ) {
    return await this.shipmentsService.findAll(query);
  }

  /**
   * GET /shipments/:id
   * Finds a single shipment by its UUID
   */
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.shipmentsService.findOne(id);
  }
}
