import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from '../shipments/entities/shipment.entity';
import { shipmentFactory } from './factories/shipment.factory';

@Injectable()
export class ShipmentsSeederService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async run() {
    console.log('--- Cleaning Database ---');
    await this.shipmentRepository.delete({});

    console.log('--- Generating 50 Shipments ---');
    const shipmentsData = Array.from({ length: 50 }).map(() =>
      shipmentFactory(),
    );

    const entities = this.shipmentRepository.create(shipmentsData);
    await this.shipmentRepository.save(entities);

    console.log('--- Seed Finished Successfully ---');
  }
}
