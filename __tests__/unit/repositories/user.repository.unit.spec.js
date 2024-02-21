import { jest } from "@jest/globals";
import { UserRepository } from "../../../repositories/user.repository";

let mockPrisma = {
  users: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let userRepository = new UserRepository(mockPrisma);

describe("User Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("findAlluser Method", async () => {
    const mockReturn = "findMany String";
    mockPrisma.users.findMany.mockReturnValue(mockReturn);

    const users = await userRepository.findAllUser();

    expect(mockPrisma.users.findMany).toHaveBeenCalledTimes(1);

    expect(users).toBe(mockReturn);
  });
  test("createUser Method", async () => {
    const mockReturn = "create Return String";
    mockPrisma.users.create.mockReturnValue(mockReturn);
    const createUserParams = {
      email: "createUseremail",
      password: "createUserpassword",
      checkpass: "createUsercheckpass",
      name: "createUsername",
      grade: "createUsergrade",
    };
    const createUserData = await userRepository.createUser(
      createUserParams.email,
      createUserParams.password,
      createUserParams.checkpass,
      createUserParams.name,
      createUserParams.grade,
    );
    expect(createUserData).toBe(mockReturn);

    expect(mockPrisma.users.create).toHaveBeenCalledTimes(1);

    // expect(mockPrisma.user.create).toHaveBeenCalledWith({
    //   data: createUserParams,
    // });
  });
});
