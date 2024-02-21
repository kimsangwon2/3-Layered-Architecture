import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.sevice.js";
import { authMiddleware } from "../middlewares/need-signin.middleware.js";

const router = express.Router();
const authController = new AuthController();
const authService = new AuthService();

//토큰 생성
router.post("/token", authMiddleware, authController.createToken);

//카카오 로그인 인가 코드 받기
router.get("/kakao", authController.kakaoToken);

//카카오 토큰 받기
router.get("/kakao/callback", authController.getkakaoToken);

//로그아웃
router.get("/kakao/logout", authController.logout);

//로그아웃 콜백
router.get("/kakao/logout/callback", authController.kakaologout);

export default router;
