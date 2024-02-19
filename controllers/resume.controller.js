// import { jest } from "@jest/globals";
import { ResumeService } from "../services/resume.service.js";
export class ResumeController {
  resumeService = new ResumeService();

  createResume = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { userId } = req.user;
      const createdResume = await this.resumeService.createResume(
        title,
        content,
        userId,
      );
      return res.status(201).json({ message: "이력서가 생성되었습니다" });
    } catch (err) {
      next(err);
    }
  };
  getResumes = async (req, res, next) => {
    try {
      const { orderKey, orderValue } = req.query;
      const resumes = await this.resumeService.findAllResume(
        orderKey,
        orderValue,
      );
      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };
  getResumeById = async (req, res, next) => {
    try {
      const { resumeId, status } = req.params;
      const resume = await this.resumeService.findResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };
  updateResume = async (req, res, next) => {
    try {
      const { title, content, status } = req.body;
      const updatedResume = await this.resumeService.updateResume(
        title,
        content,
        status,
      );

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };
  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { email } = res.locals.user;
      const deletedResume = await this.resumeService.deleteResume(
        resumeId,
        email,
      );
      return res.status(200).json({ data: deletedResume });
    } catch (err) {
      next(err);
    }
  };
}
