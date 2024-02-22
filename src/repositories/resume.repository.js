// import { dataSource } from "../typeorm/index.js";
import { sendTodayData } from "../../slackbot.js";

export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  createResume = async (userId, title, content) => {
    const createdResume = await this.prisma.resume.create({
      data: { userId, title, content },
    });
    return createdResume;
  };

  findAllResume = async (orderKey, orderValue) => {
    const randumNum = Math.floor(Math.random() * 6);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, randumNum * 1000);
    });
    if (randumNum >= 3000) await sendTodayData();

    const resumes = await this.prisma.resume.findMany({
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
    const resume = await this.prisma.resume.findFirst({
      where: { resumeId: +resumeId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    // typeORM 테스트
    // const resume = await dataSource.getRepository("Resume").findOne({
    //   where: {
    //     resumeId: +resumeId,
    //   },
    //   include: {
    //     user: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //   },
    // });
    return resume;
  };
  updateResume = async (userId, resumeId, title, content, status, grade) => {
    const updatedResume = await this.prisma.resume.update({
      where: { resumeId: +resumeId },
      data: {
        title,
        content,
        status,
        userId,
        grade,
      },
    });
    return updatedResume;
  };
  deleteResume = async (resumeId, email) => {
    const deletedResume = await this.prisma.resume.delete({
      where: { resumeId: +resumeId, user: { email } },
    });
    return deletedResume;
  };
}
