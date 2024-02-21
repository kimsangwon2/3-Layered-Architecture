import express from "express";
import { prisma } from "../index.js";
import { UserController } from "../src/services/controllers/user.controller.js";
import { UserRepository } from "../src/services/repositories/user.repository.js";
import { UserService } from "../src/services/user.service.js";

const router = express.Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

//회원가입 API
router.post("/sign-up", userController.createUser);

//로그인API
router.post("/sign-in", userController.signinUser);

//사용자 정보 조회API
router.get("/users", userController.getUser);

//사용자 정보 상세 조회API
router.get("/users/:userId", userController.findUserId);

export default router;
