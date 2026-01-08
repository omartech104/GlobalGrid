// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ShipmentsSeederService } from './main.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = await app.resolve(ShipmentsSeederService);

  try {
    await seeder.run();
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
