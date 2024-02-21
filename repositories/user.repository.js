import bcrypt from "bcrypt";
export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser = async (email, password, checkpass, name, grade) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.prisma.user.create({
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
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: {
        email: true,
        userId: true,
      },
    });
    return user;
  };
  findAllUser = async () => {
    const users = await this.prisma.user.findMany();
    return users;
  };
  findUser = async (userId) => {
    const user = await this.prisma.user.findFirst({
      where: { userId: +userId },
    });

    return user;
  };
  findEmail = async (email) => {
    const findemail = await this.prisma.user.findFirst({
      where: { email: email },
    });
    return findemail;
  };
}
