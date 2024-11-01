process.env.DOTENV_CONFIG_PATH = `${process.cwd()}/.env.${process.env.NODE_ENV ? `${process.env.NODE_ENV}` : 'dev'}`;
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DictionaryWord } from '../dictionary-records/entities/dictionary-record.entity';
import { AccessLog } from '../dictionary-records/entities/access-log.entity';
import { AccessSummary } from '../dictionary-records/entities/access-summary.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [DictionaryWord, AccessLog, AccessSummary],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
