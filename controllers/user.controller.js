// import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/need-signin.middleware.js";
import axios from "axios";
import { UserService } from "../services/user.service.js";
export class UserController {
  userService = new UserService();

  createUser = async (req, res, next) => {
    try {
      const { email, password, checkpass, name, grade } = req.body;

      const createdUser = await this.userService.createUser(
        email,
        password,
        checkpass,
        name,
        grade,
      );
      return res.status(200).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };

  signinUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { userId } = req.params;
      const users = await this.userService.signinUser(email);
      return res.status(200).json({ data: users });
    } catch (err) {
      next(err);
    }
  };
  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.findAllUser();
      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
  findUserId = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const users = await this.userService.findUser(userId);
      return res.status(200).json({ data: users });
    } catch (err) {
      next(err);
    }
  };
  findEmail = async (req, res, next) => {
    try {
      const email = req.params;
      const findemail = await this.userService.findEmail(email);
    } catch (err) {
      next(err);
    }
  };
}
