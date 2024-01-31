import express from "express";
import { prisma } from "../models/index.js";
import authMiddleware from "../middlewares/need-signin.middleware.js";
const router = express.Router();

//이력서 생성API
router.post("/resume", authMiddleware, async (req, res, next) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  const resumes = await prisma.resume.create({
    data: {
      title: title,
      content: content,
      userId,
    },
  });
  return res.status(201).json({ message: "이력서가 생성되었습니다" });
});

//모든 이력서 목록 조회API
router.get("/resume", async (req, res, next) => {
  const { resumeId, orderKey, orderValue } = req.query;
  let sortword = "desc";
  if (orderKey && orderValue.toLowerCase() === "asc") {
    sortword = "asc";
  }
  const resume = await prisma.resume.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: sortword,
    },
  });
  return res.status(200).json({ data: resume });
});

//이력서 상세 조회API
router.get("/resume/:resumeId", async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const resume = await prisma.resume.findFirst({
      where: { resumeId: +resumeId },
      select: {
        resumeId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });

    return res.status(200).json({ data: resume });
  } catch (err) {
    next(err);
  }
});

//이력서 수정API
router.put("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { title, content, status } = req.body;
  const { resumeId } = req.params;
  const { name } = req.user;
  const resumes = await prisma.resume.findFirst({
    where: { resumeId: +resumeId },
  });
  if (!resumes) {
    return res.status(404).json({ message: "이력서 조회에 실패하였습니다" });
  }
  const resume = await prisma.resume.update({
    where: { resumeId: +resumeId, user: { name } },
    data: {
      title,
      content,
      status,
    },
  });
  return res.status(200).json({ data: resume });
});
//이력서 삭제API
router.delete("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { resumeId } = req.params;
  const { name } = req.user;
  const resumes = await prisma.resume.findFirst({
    where: { resumeId: +resumeId },
  });
  if (!resumes) {
    return res.status(404).json({ message: "이력서 조회에 실패하였습니다" });
  }
  const resume = await prisma.resume.delete({
    where: { resumeId: +resumeId, user: { name } },
  });
  return res.status(200).json({ data: resume });
});

export default router;
