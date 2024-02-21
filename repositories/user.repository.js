import bcrypt from "bcrypt";
export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser = async (email, password, checkpass, name, grade) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.prisma.users.create({
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
  findAllUser = async () => {
    const user = await this.prisma.users.findMany();
    return user;
  };
  findUser = async (userId) => {
    const user = await this.prisma.users.findFirst({
      where: { userId: +userId },
    });

    return user;
  };
  findEmail = async (email) => {
    const findemail = await this.prisma.users.findFirst({
      where: { email: email },
    });
    return findemail;
  };
}
