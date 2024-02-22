import "dotenv/config";
import { DataSource } from "typeorm";
import UserEntity from "./entity/user.entity.js";
import ResumeEntity from "./entity/resume.entity.js";

export const dataSource = new DataSource({
  type: "mysql",
  host: "express-database.czcsgiyymbuq.ap-northeast-2.rds.amazonaws.com",
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  entities: [UserEntity, ResumeEntity],
});
// export const dataSource = new DataSource({
//   type: "mysql",
//   host: "express-database.czcsgiyymbuq.ap-northeast-2.rds.amazonaws.com",
//   port: 3306,
//   username: "root",
//   password: "aaaa4321",
//   database: "resume",
//   synchronize: false,
//   entities: [ResumeEntity],
// });
dataSource.initialize();
