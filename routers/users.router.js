import express from "express";
import { prisma } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/need-signin.middleware.js";

const router = express.Router();

//회원가입 API
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, checkpass, name } = req.body;
    const isExistUser = await prisma.users.findFirst({
      where: { email },
    });
    if (isExistUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }
    const checkpassword = await prisma.users.findFirst({
      where: { password, checkpass },
    });
    if (password != checkpass) {
      return res
        .status(401)
        .json({ message: "비밀번호가 일치한지 확인해주세요" });
    }
    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "비밀번호가 6자 이상인지 확인해주세요" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        checkpass: hashedPassword,
        name,
      },
    });

    return res.status(201).json({ message: "회원가입이 완료되었습니다" });
  } catch (err) {
    next(err);
  }
});

//로그인API ★ token이 만료 되었을때 refreshtoken을 활용하여 자동 로그인 완성하기
//1. refresh에 refreshtoken값 넣기
//2. token이 만료되었을때 refreshtoken을 활용해서 token 재발급하기
router.post("/sign-in", async (req, res, next) => {
  const { userId, email, password } = req.body;

  const user = await prisma.users.findFirst({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "존재하지 않는 이메일입니다" });
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });

  const token = jwt.sign({ userId: user.userId }, "custom-secret-key", {
    expiresIn: "12h",
  });

  const refreshtoken = jwt.sign({ userId: user.userId }, "custom-secret-key", {
    expiresIn: "7d",
  });
  res.cookie("authorization", `Bearer ${token}`);
  return res.status(200).json({ message: "로그인에 성공하였습니다" });
});

//사용자 정보 조회API
router.get("/users", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;

  const user = await prisma.users.findFirst({
    where: { userId: +userId },
    select: {
      userId: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });
  return res.status(200).json({ data: user });
});

export default router;
