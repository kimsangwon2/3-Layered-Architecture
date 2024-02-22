import { jest } from "@jest/globals";
import { UserService } from "../../../src/services/user.service";

let mockUserRepository = {
  createUser: jest.fn(),
  signinUser: jest.fn(),
  findAllUser: jest.fn(),
  findUser: jest.fn(),
  findEmail: jest.fn(),
};
let userService = new UserService(mockUserRepository);

describe("User Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("findAllUser Method", async () => {
    const sampleUser = [
      {
        userId: 1,
        email: "ksy02155@naver.com",
        name: "김상원",
        createdAt: "2024-01-31T08:36:35.659Z",
        grade: "USER",
      },
      {
        userId: 3,
        email: "ksy021551@naver.com",
        name: "김상원1",
        createdAt: "2024-01-31T08:44:36.789Z",
        grade: "USER",
      },
    ];
    mockUserRepository.findAllUser.mockReturnValue(sampleUser);

    const allUser = await userService.findAllUser();

    expect(allUser).toEqual(
      sampleUser.sort((a, b) => {
        return b.createdAt - a.createdAt;
      }),
    );
    expect(mockUserRepository.findAllUser).toHaveBeenCalledTimes(1);
  });
});
