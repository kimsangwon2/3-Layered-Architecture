import "dotenv/config";
import { DataSource } from "typeorm";
import UserEntity from "./entity/user.entity.js";
import ResumeEntity from "./entity/resume.entity.js";

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  entities: [UserEntity, ResumeEntity],
});
// dataSource.initialize();
