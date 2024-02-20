import express from "express";
// import { jest } from "@jest/globals";
import { prisma } from "../index.js";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController();

//회원가입 API
router.post("/sign-up", userController.createUser);

//로그인API
router.post("/sign-in", userController.signinUser);

//사용자 정보 조회API
router.get("/users", userController.getUser);

//사용자 정보 상세 조회API
router.get("/users/:userId", userController.findUserId);

export default router;
