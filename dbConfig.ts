import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URI,
  ssl: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production!
}