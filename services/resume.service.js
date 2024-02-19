// import { jest } from "@jest/globals";
import { ResumeRepository } from "../repositories/resume.repository.js";

export class ResumeService {
  resumeRepository = new ResumeRepository();

  createResume = async (title, content) => {
    const createdResume = await this.resumeRepository.createResume(
      title,
      content,
    );
    return {
      title: createdResume.title,
      content: createdResume.content,
      userId: createdResume.userId,
    };
  };

  findAllResume = async (orderKey, orderValue) => {
    if (orderKey && orderValue.toLowerCase() === "asc") {
      orderValue ?? "asc";
    }
    if (orderKey && orderValue.toLowerCase() === "desc") orderValue ?? "desc";
    const resumes = await this.resumeRepository.findAllResume(
      orderKey,
      orderValue.toLowerCase(),
    );
    return resumes.map((resumes) => {
      return {
        resumeId: resumes.resumeId,
        title: resumes.title,
        content: resumes.content,
        status: resumes.status,
        createdAt: resumes.createdAt,
        updatedAt: resumes.updatedAt,
        userId: resumes.userId,
      };
    });
  };
  findResumeById = async (resumeId) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    return {
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      userId: resume.userId,
    };
  };
  updateResume = async (resumeId, title, content, status) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    if (!resume) throw new Error("이력서 조회에 실패하였습니다");
    if (resume.userId != userId && grade === "USER") {
      throw new Error("수정할 권한이 없습니다");
    }

    await this.resumeRepository.updateResume(resumeId, title, content, status);

    const updatedResume = await this.resumeRepository.findResumeById(resumeId);

    return {
      resumeId: updatedResume.resumeId,
      title: updatedResume.title,
      content: updatedResume.content,
      status: updatedResume.status,
      updatedAt: updatedResume.updatedAt,
    };
  };
  deleteResume = async (resumeId, email) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    if (!resume) throw new Error("이력서 조회에 실패하였습니다");

    await this.resumeRepository.deleteResume(resumeId, email);

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
      userId: resume.userId,
    };
  };
}
