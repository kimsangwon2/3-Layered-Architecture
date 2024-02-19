import express from "express";
// import { jest } from "@jest/globals";
import { ResumeController } from "../controllers/resume.controller.js";
import authMiddleware from "../middlewares/need-signin.middleware.js";

const router = express.Router();
const resumeController = new ResumeController();

//이력서 생성API
router.post("/resume", authMiddleware, resumeController.createResume);

//모든 이력서 조회API
router.get("/resume", resumeController.getResumes);

//이력서 단건 조회API
router.get("/resume/:resumeId", resumeController.getResumeById);

//이력서 수정API
router.put("/resume/:resumeId", authMiddleware, resumeController.updateResume);

//이력서 삭제API
router.delete(
  "/resume/:resumeId",
  authMiddleware,
  resumeController.deleteResume,
);

export default router;
//이력서 생성API
// router.post("/resume", authMiddleware, async (req, res, next) => {
//   const { title, content } = req.body;
//   const user = res.locals.user;
//   const resumes = await prisma.resume.create({
//     data: {
//       title: title,
//       content: content,
//       userId: user.userId,
//     },
//   });
//   return res.status(201).json({ message: "이력서가 생성되었습니다" });
// });

//모든 이력서 목록 조회API
// router.get("/resume", async (req, res, next) => {
//   const { orderKey, orderValue } = req.query;
//   orderValue ?? "desc";
//   if (orderKey && orderValue.toLowerCase() === "asc") {
//     orderValue ?? "asc";
//   }
//   const resume = await prisma.resume.findMany({
//     include: {
//       user: {
//         select: {
//           name: true,
//         },
//       },
//     },
//     orderBy: {
//       [orderKey]: orderValue.toLowerCase(),
//     },
//   });
//   return res.status(200).json({ data: resume });
// });

// //이력서 상세 조회API
// router.get("/resume/:resumeId", async (req, res, next) => {
//   try {
//     const { resumeId } = req.params;
//     const resume = await prisma.resume.findFirst({
//       where: { resumeId: +resumeId },
//       select: {
//         resumeId: true,
//         title: true,
//         content: true,
//         status: true,
//         createdAt: true,
//         user: { select: { name: true } },
//       },
//     });

//     return res.status(200).json({ data: resume });
//   } catch (err) {
//     next(err);
//   }
// });

// //이력서 수정API
// router.put("/resume/:resumeId", authMiddleware, async (req, res, next) => {
//   const { title, content, status } = req.body;
//   const { resumeId } = req.params;
//   const { grade, userId } = res.locals.user;
//   const resumes = await prisma.resume.findFirst({
//     where: { resumeId: +resumeId },
//   });
//   if (!resumes) {
//     return res.status(404).json({ message: "이력서 조회에 실패하였습니다" });
//   }
//   if (resumes.userId != userId && grade === "USER") {
//     return res.status(404).json({ message: "수정할 권한이 없습니다" });
//   }
//   const resume = await prisma.resume.update({
//     where: { resumeId: +resumeId },
//     data: {
//       title,
//       content,
//       status,
//     },
//   });

//   return res.status(200).json({ data: resume });
// });
// //이력서 삭제API
// router.delete("/resume/:resumeId", authMiddleware, async (req, res, next) => {
//   const { resumeId } = req.params;
//   const { email } = res.locals.user;
//   const resumes = await prisma.resume.findFirst({
//     where: { resumeId: +resumeId },
//   });
//   if (!resumes) {
//     return res.status(404).json({ message: "이력서 조회에 실패하였습니다" });
//   }
//   const resume = await prisma.resume.delete({
//     where: { resumeId: +resumeId, user: { email } },
//   });
//   return res.status(200).json({ data: resume });
// });

// export default router;
