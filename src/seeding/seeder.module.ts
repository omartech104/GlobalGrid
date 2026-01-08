import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsModule } from 'src/shipments/shipments.module';
import { ShipmentsSeederService } from './main.seeder';
import { pgConfig } from 'dbConfig';

@Module({
  imports: [ShipmentsModule, TypeOrmModule.forRoot(pgConfig)],
  providers: [ShipmentsSeederService],
})
export class SeederModule {}
