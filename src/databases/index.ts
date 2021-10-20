import config from 'config';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '@interfaces/db.interface';
import { User } from '../entity/users.entity';
import { Product } from '../entity/products.entity';
import { Transaction } from '@/entity/transaction.entity';

const { host, user, password, database }: dbConfig = config.get('dbConfig');
export const dbConnection: ConnectionOptions = {
  type: 'postgres',
  host: host,
  port: 5432,
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [User, Product, Transaction],
  migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
