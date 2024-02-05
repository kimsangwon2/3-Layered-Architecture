import express from "express";
import { prisma } from "../models/index.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/need-signin.middleware.js";
import dotenv from "dotenv";
const router = express.Router();
router.post("/token", authMiddleware, async (req, res, next) => {
  dotenv.config();
  const { refreshtoken } = req.body;
  const SECRETKEY = process.env.SECRETKEY;
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.verify(refreshtoken, SECRET_KEY);
  const user = await prisma.users.findFirst({
    where: { userId: token.userId },
  });
  const newaccesstoken = jwt.sign({ userId: user.userId }, SECRETKEY, {
    expiresIn: "12h",
  });
  const newrefreshtoken = jwt.sign({ userId: user.userId }, SECRET_KEY, {
    expiresIn: "7d",
  });
  return res
    .status(201)
    .json({ accesstoken: newaccesstoken, refreshtoken: newrefreshtoken });
});

export default router;
