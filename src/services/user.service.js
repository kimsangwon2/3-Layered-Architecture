import jwt from "jsonwebtoken";
import { redisCache } from "../../redis/index.js";
export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser = async (email, password, checkpass, name, grade) => {
    const isExistUser = await this.userRepository.findEmail({});
    if (isExistUser) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
    if (password != checkpass) {
      throw new Error("비밀번호가 일치한지 확인해주세요");
    }
    if (password.length < 6) {
      throw new Error("비밀번호가 6자 이상인지 확인해주세요");
    }
    const createdUser = await this.userRepository.createUser(
      email,
      password,
      checkpass,
      name,
      grade,
    );
    return {
      email: createdUser.email,
      password: createdUser.password,
      checkpass: createdUser.checkpass,
      name: createdUser.name,
      grade: createdUser.grade,
    };
  };
  signinUser = async (email, password) => {
    const user = await this.userRepository.findEmail(email);
    const accesstoken = jwt.sign(
      { userId: user.userId },
      process.env.SECRETKEY,
      {
        expiresIn: "12h",
      },
    );
    const refreshtoken = jwt.sign(
      { userId: user.userId },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    await redisCache.set(`REFRESH_TOKEN:${user.userId}`, refreshtoken);
    return {
      accesstoken,
      refreshtoken,
    };
  };
  findAllUser = async () => {
    const user = await this.userRepository.findAllUser();
    return user.map((user) => {
      return {
        userId: user.userId,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        grade: user.grade,
      };
    });
  };
  findUser = async (userId) => {
    const user = await this.userRepository.findUser(userId);
    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      grade: user.grade,
    };
  };
  findEmail = async (email) => {
    const findemail = await this.userRepository.findEmail(email);
    return {
      email: findemail.email,
    };
  };
}
