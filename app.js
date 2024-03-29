import express from "express";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import AuthRouter from "./src/routers/auth.router.js";
import ResumeRouter from "./src/routers/resume.router.js";
import UserRouter from "./src/routers/users.router.js";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";

const app = express();
const PORT = 3018;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api", [ResumeRouter, UserRouter, AuthRouter]);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
