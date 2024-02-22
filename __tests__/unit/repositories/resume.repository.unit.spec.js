import { jest } from "@jest/globals";
import { ResumeRepository } from "../../../src/repositories/resume.repository";

let mockPrisma = {
  resume: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let resumeRepository = new ResumeRepository(mockPrisma);

describe("Resume Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("findAllresume Method", async () => {
    const mockReturn = "findMany String";
    mockPrisma.resume.findMany.mockReturnValue(mockReturn);

    const resume = await resumeRepository.findAllResume();

    expect(resumeRepository.prisma.resume.findMany).toHaveBeenCalledTimes(1);

    expect(resume).toBe(mockReturn);
  });
  test("createResume Method", async () => {
    const mockReturn = "create Return String";
    mockPrisma.resume.create.mockReturnValue(mockReturn);

    const createResumeParams = {
      userId: "createResumeuserId",
      title: "createResumetitle",
      content: "createResumecontent",
    };
    const createResumeData = await resumeRepository.createResume(
      createResumeParams.userId,
      createResumeParams.title,
      createResumeParams.content,
    );
    expect(createResumeData).toBe(mockReturn);

    expect(mockPrisma.resume.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.resume.create).toHaveBeenCalledWith({
      data: createResumeParams,
    });
  });
});
