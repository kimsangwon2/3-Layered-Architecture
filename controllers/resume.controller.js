export class ResumeController {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }
  createResume = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { userId } = req.user;
      if (!title || !content) throw new Error("InvalidParamsError");
      const createdResume = await this.resumeService.createResume(
        userId,
        title,
        content,
      );
      return res.status(201).json({ data: createdResume });
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
      const { userId } = req.user;
      const { resumeId } = req.params;
      const updatedResume = await this.resumeService.updateResume(
        userId,
        resumeId,
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
      const { email, grade } = req.user;
      const deletedResume = await this.resumeService.deleteResume(
        resumeId,
        email,
        grade,
      );
      return res.status(200).json({ data: deletedResume });
    } catch (err) {
      next(err);
    }
  };
}
