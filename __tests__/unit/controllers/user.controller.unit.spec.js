import { jest } from "@jest/globals";
import { UserController } from "../../../controllers/user.controller.js";
const mockUserService = {
  signinUser: jest.fn(),
  findAllUser: jest.fn(),
  createUser: jest.fn(),
  findUser: jest.fn(),
  findEmail: jest.fn(),
};
const mockRequest = {
  params: jest.fn(),
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const userController = new UserController(mockUserService);

describe("User Controller Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });

  test("findUser Method by Success", async () => {
    const sampleUser = {
      userId: 5,
      email: "ksy02155123@naver.com",
      name: "김상원2",
      createdAt: "2024-02-02T11:04:02.493Z",
      grade: "admin",
    };
    mockUserService.findUser.mockReturnValue(sampleUser);

    await userController.getUser(mockRequest, mockResponse, mockNext);

    await mockUserService.findUser();

    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // expect(mockResponse.json).toHaveBeenCalledWith({
    //   data: sampleUser,
    // });
  });

  test("createUser Method by Success", async () => {
    const createUserRequestBodyParams = {
      email: "Email_Success",
      password: "Password_Success",
      checkpass: "Checkpass_Success",
      name: "Name_Success",
      grade: "Grade_Success",
    };

    mockRequest.body = createUserRequestBodyParams;
    const createUserReturnValue = {
      ...createUserRequestBodyParams,
    };

    mockUserService.createUser.mockReturnValue(createUserReturnValue);

    const createUser = await userController.createUser(
      mockRequest,
      mockResponse,
      mockNext,
    );
    expect(mockUserService.createUser).toHaveBeenCalledTimes(1);
    expect(mockUserService.createUser).toHaveBeenCalledWith(
      createUserRequestBodyParams.email,
      createUserRequestBodyParams.password,
      createUserRequestBodyParams.checkpass,
      createUserRequestBodyParams.name,
      createUserRequestBodyParams.grade,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createUserReturnValue,
    });
  });

  test("createUser Method by Invalid Params Error", async () => {
    mockRequest.body = {
      email: "Email_InvalidParamsError",
      password: "Password_InvalidParamsError",
      checkpass: "Checkpass_InvalidParamsError",
      name: "Name_InvalidParamsError",
      grade: "Grade_InvalidParamsError",
    };
    mockRequest.body = mockNext;
    await userController.createUser(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error("Invalid Params Error"));
  });
});
