import { jest } from "@jest/globals";
import { ResumeController } from "../../../src/controllers/resume.controller.js";
const mockResumeService = {
  findAllResume: jest.fn(),
  findResumeById: jest.fn(),
  createResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};
const mockRequest = {
  body: jest.fn(),
  query: jest.fn(),
  user: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const resumeController = new ResumeController(mockResumeService);

describe("Resume Controller Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test("getResumes Method by Success", async () => {
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
    mockRequest.query({ orderKey: "resumeId", orderValue: "desc" });
    mockResumeService.findAllResume.mockReturnValue(sampleResume);

    await resumeController.getResumes(mockRequest, mockResponse, mockNext);
    expect(mockResumeService.findAllResume).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: sampleResume,
    });
  });

  test("createResume Method by Success", async () => {
    const createResumeRequestBodyParams = {
      title: "Title_Success",
      content: "Content_Success",
    };
    const createResumeRequestUserParams = {
      userId: "UserId_Success",
    };

    mockRequest.body = createResumeRequestBodyParams;
    mockRequest.user = createResumeRequestUserParams;
    const createResumeReturnValue = {
      resumeId: 1,
      ...createResumeRequestBodyParams,
      ...createResumeRequestUserParams,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mockResumeService.createResume.mockReturnValue(createResumeReturnValue);

    const createResume = await resumeController.createResume(
      mockRequest,
      mockResponse,
      mockNext,
    );
    expect(mockResumeService.createResume).toHaveBeenCalledTimes(1);
    expect(mockResumeService.createResume).toHaveBeenCalledWith(
      createResumeRequestUserParams.userId,
      createResumeRequestBodyParams.title,
      createResumeRequestBodyParams.content,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createResumeReturnValue,
    });
  });

  test("createResume Method by Invalid Params Error", async () => {
    mockRequest.body = {
      title: "Title_InvalidParamsError",
      content: "Content_InvalidParamsError",
    };
    mockRequest.body = mockNext;
    await resumeController.createResume(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error("InvalidParamsError"));
  });
});
