// import { jest } from "@jest/globals";
import { prisma } from "../index.js";
import bcrypt from "bcrypt";
export class UserRepository {
  createUser = async (email, password, checkpass, name, grade) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        checkpass: hashedPassword,
        name,
        grade,
      },
      select: {
        email: true,
        password: false,
        checkpass: false,
        name: true,
        grade: true,
      },
    });
    return createdUser;
  };
  signinUser = async (email, paswword) => {
    const user = await prisma.users.findFirst({
      where: { email },
      select: {
        email: true,
        userId: true,
      },
    });
    return user;
  };
  findAllUser = async () => {
    const users = await prisma.users.findMany();
    return users;
  };
  findUser = async (userId) => {
    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });

    return user;
  };
  findEmail = async (email) => {
    const findemail = await prisma.users.findFirst({
      where: { email: email },
    });
  };
}
