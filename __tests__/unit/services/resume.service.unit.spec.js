import { jest } from "@jest/globals";
import { ResumeService } from "../../../src/services/resume.service";

let mockResumeRepository = {
  findAllResume: jest.fn(),
  findResumeById: jest.fn(),
  createResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};
let resumeService = new ResumeService(mockResumeRepository);

describe("Resume Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("findAllResume Method", async () => {
    const sampleResume = [
      {
        userId: 3,
        resumeId: 8,
        title: "테스트1",
        content: "테스트1",
        status: "PASS",
        createdAt: "2024-02-02T10:59:39.199Z",
        updatedAt: "2024-02-02T11:50:34.797Z",
      },
      {
        userId: 3,
        resumeId: 7,
        title: "테스트2",
        content: "테스트2",
        status: "PASS",
        createdAt: "2024-02-02T02:05:56.987Z",
        updatedAt: "2024-02-02T11:49:50.324Z",
      },
    ];
    mockResumeRepository.findAllResume.mockReturnValue(sampleResume);

    const allResume = await resumeService.findAllResume();

    expect(allResume).toEqual(
      sampleResume.sort((a, b) => {
        return b.createdAt - a.createdAt;
      }),
    );
    expect(mockResumeRepository.findAllResume).toHaveBeenCalledTimes(1);
  });
  test("deleteResume Method By Success", async () => {
    const sampleResume = {
      userId: 1,
      resumeId: 1,
      title: "테스트1",
      content: "테스트1",
      status: "PASS",
      createdAt: "2024-02-20T01:54:03.332Z",
      updatedAt: "2024-02-20T01:54:11.273Z",
    };
    mockResumeRepository.findResumeById.mockReturnValue(sampleResume);

    const deleteResume = await resumeService.deleteResume();

    expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1);
    // expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(
    //   sampleResume.resumeId,
    // );
    expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(1);
    // expect(mockResumeRepository.deleteResume).toHaveBeenCalledWith(
    //   sampleResume.resumeId,
    //   sampleResume.userId,
    // );

    expect(deleteResume).toEqual({
      userId: sampleResume.userId,
      resumeId: sampleResume.resumeId,
      title: sampleResume.title,
      content: sampleResume.content,
      status: sampleResume.status,
      createdAt: sampleResume.createdAt,
      updatedAt: sampleResume.updatedAt,
    });
  });
  test("deleteResume Method By Not Found Resume Error", async () => {
    const sampleResume = null;

    mockResumeRepository.findResumeById.mockReturnValue(sampleResume);

    try {
      await resumeService.deleteResume(8888, "1234");
    } catch (error) {
      expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1);
      expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(8888);

      expect(error.message).toEqual("이력서 조회에 실패하였습니다");
    }
  });
});
