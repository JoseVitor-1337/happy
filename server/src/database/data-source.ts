import "dotenv/config";
import "reflect-metadata";

import { DataSource } from "typeorm";

const host = process.env.DATABASE_HOST as string | "localhost";
const port = process.env.DATABASE_PORT as number | undefined;
const username = process.env.DATABASE_USERNAME as string | undefined;
const password = process.env.DATABASE_PASSWORD as string | undefined;
const database = process.env.DATABASE_NAME as string | undefined;

export const AppDataSource = new DataSource({
  type: "mysql",
  host,
  port,
  username,
  password,
  database,
  entities: [`${__dirname}/**/entities/*.{ts, js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
});
