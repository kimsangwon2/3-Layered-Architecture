export class ResumeService {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository;
  }

  createResume = async (userId, title, content) => {
    const createdResume = await this.resumeRepository.createResume(
      userId,
      title,
      content,
    );
    return {
      userId: createdResume.userId,
      title: createdResume.title,
      content: createdResume.content,
    };
  };

  findAllResume = async (orderKey, orderValue) => {
    if (orderKey && orderValue.toLowerCase() === "asc") {
      orderValue ?? "asc";
    }
    if (orderKey && orderValue.toLowerCase() === "desc") orderValue ?? "desc";
    const resumes = await this.resumeRepository.findAllResume(
      orderKey,
      orderValue ? orderValue.toLowerCase() : undefined,
    );
    return resumes.map((resumes) => {
      return {
        userId: resumes.userId,
        resumeId: resumes.resumeId,
        title: resumes.title,
        content: resumes.content,
        status: resumes.status,
        createdAt: resumes.createdAt,
        updatedAt: resumes.updatedAt,
      };
    });
  };
  findResumeById = async (resumeId) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    return {
      userId: resume.userId,
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
  updateResume = async (userId, resumeId, title, content, status, grade) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    if (!resume) throw new Error("이력서 조회에 실패하였습니다");
    if (resume.userId != userId && grade === "USER") {
      throw new Error("수정할 권한이 없습니다");
    }

    await this.resumeRepository.updateResume(
      userId,
      resumeId,
      title,
      content,
      status,
    );

    const updatedResume = await this.resumeRepository.findResumeById(resumeId);

    return {
      userId: updatedResume.userId,
      resumeId: updatedResume.resumeId,
      title: updatedResume.title,
      content: updatedResume.content,
      status: updatedResume.status,
      updatedAt: updatedResume.updatedAt,
    };
  };
  deleteResume = async (resumeId, userId, email, grade) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    if (!resume) throw new Error("이력서 조회에 실패하였습니다");
    if (resume.userId != userId && grade === "USER")
      throw new Error("본인이 작성한 이력서가 아닙니다");
    await this.resumeRepository.deleteResume(resumeId, userId, email, grade);

    return {
      userId: resume.userId,
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
}
