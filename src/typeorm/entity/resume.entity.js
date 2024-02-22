import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Resume",
  tableName: "resume",
  columns: {
    resumeId: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "varchar",
    },
    status: {
      type: "varchar",
    },
    userId: {
      type: "int",
    },
    createdAt: {
      type: "datetime",
    },
    updatedAt: {
      type: "datetime",
    },
  },
  relations: {
    users: {
      target: "Users",
      type: "many-to-one",
      joinTable: true,
      joinColumn: { name: "userId" },
      cascade: true,
    },
  },
});
