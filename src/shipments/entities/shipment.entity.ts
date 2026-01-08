import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShipmentStatus } from '../../common/constants/shipment.constants';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trackingNumber: string;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.PENDING, // Auto-applied if missing
  })
  status: ShipmentStatus;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @CreateDateColumn()
  createdAt: Date;
}
