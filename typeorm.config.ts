import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: `${process.cwd()}/.env.${process.env.NODE_ENV ?? 'development'}`,
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/dictionary-records/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
