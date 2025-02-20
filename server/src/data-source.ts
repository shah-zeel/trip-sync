import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Activity } from "./models/Activity";
import { Trip } from "./models/Trip";
import { Expense } from "./models/Expense";
import { Invite } from "./models/Invite";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "ts",
  synchronize: true,
  logging: false,
  entities: [User, Trip, Activity, Expense, Invite],
});
