// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { ShipmentsSeederService } from './main.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

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
