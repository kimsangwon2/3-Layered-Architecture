// import { jest } from "@jest/globals";
import { prisma } from "../index.js";

export class ResumeRepository {
  createResume = async (title, content) => {
    const createdResume = await prisma.resume.create({
      data: {
        title: title,
        content: content,
        userId: user.userId,
      },
    });
    return createdResume;
  };

  findAllResume = async (orderKey, orderValue) => {
    const resumes = await prisma.resume.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        [orderKey]: orderValue,
      },
    });
    return resumes;
  };
  findResumeById = async (resumeId) => {
    const resume = await prisma.resume.findFirst({
      where: { resumeId: +resumeId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return resume;
  };
  updateResume = async (resumeId, title, content, status) => {
    const updatedResume = await prisma.resume.update({
      where: { resumeId: +resumeId },
      data: {
        title,
        content,
        status,
      },
    });
    return updatedResume;
  };
  deleteResume = async (resumeId, email) => {
    const deletedResume = await prisma.resume.delete({
      where: { resumeId: +resumeId, user: { email } },
    });
    return deletedResume;
  };
}
