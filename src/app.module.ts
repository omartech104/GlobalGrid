import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentsModule } from './shipments/shipments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from '../dbConfig';

@Module({
  imports: [TypeOrmModule.forRoot(pgConfig), ShipmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
