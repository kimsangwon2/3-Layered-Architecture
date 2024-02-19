import express from "express";
// import { jest } from "@jest/globals";
import { prisma } from "../index.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/need-signin.middleware.js";
import dotenv from "dotenv";
// import { AuthController } from "../controllers/auth.controller.js";
const router = express.Router();
// const authController = new AuthController();

// //토큰 생성
// router.post("/token", authController.createToken);

// //카카오 로그인 인가 코드 받기
// router.get("/kakao", authController.kakaoToken);

// //카카오 토큰 받기
// router.get("/kakao/callback", authController.getkakaoToken);

// //로그아웃
// router.get("/kakao/logout", authController.logout);

// //로그아웃
// router.get("kakao/logout/callback", authController.kakaologout);

// router.post("/token", authMiddleware, async (req, res, next) => {
//   dotenv.config();
//   const { refreshtoken } = req.body;
//   const SECRETKEY = process.env.SECRETKEY;
//   const SECRET_KEY = process.env.SECRET_KEY;
//   const token = jwt.verify(refreshtoken, SECRET_KEY);
//   const user = await prisma.users.findFirst({
//     where: { userId: token.userId },
//   });
//   const newaccesstoken = jwt.sign({ userId: user.userId }, SECRETKEY, {
//     expiresIn: "12h",
//   });
//   const newrefreshtoken = jwt.sign({ userId: user.userId }, SECRET_KEY, {
//     expiresIn: "7d",
//   });
//   return res
//     .status(201)
//     .json({ accesstoken: newaccesstoken, refreshtoken: newrefreshtoken });
// });

export default router;
