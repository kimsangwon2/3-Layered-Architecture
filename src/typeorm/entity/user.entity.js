import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Users",
  tableName: "users",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    checkpass: {
      type: "varchar",
    },

    name: {
      type: "varchar",
    },
    createdAt: {
      type: "datetime",
    },
    grade: {
      type: "varchar",
    },
  },
});
