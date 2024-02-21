import express from "express";
import { prisma } from "../index.js";
import { ResumeController } from "../controllers/resume.controller.js";
import { ResumeRepository } from "../repositories/resume.repository.js";
import { ResumeService } from "../services/resume.service.js";
import { authMiddleware } from "../middlewares/need-signin.middleware.js";

const router = express.Router();

const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

/** 이력서 조회 API **/
router.get("/resume", authMiddleware, resumeController.getResumes);

/** 이력서 상세 조회 API **/
router.get("/resume/:resumeId", authMiddleware, resumeController.getResumeById);

/** 이력서 작성 API **/
router.post("/resume", authMiddleware, resumeController.createResume);

/** 이력서 수정 API **/
router.put("/resume/:resumeId", authMiddleware, resumeController.updateResume);

/** 이력서 삭제 API **/
router.delete(
  "/resume/:resumeId",
  authMiddleware,
  resumeController.deleteResume,
);

export default router;
