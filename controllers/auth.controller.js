// import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import axios from "axios";
export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  createToken = async (req, res, next) => {
    try {
      const { refreshtoken } = req.body;
      const { userId } = req.user;
      const token = jwt.verify(refreshtoken, process.env.SECRET_KEY);
      const newaccesstoken = jwt.sign(
        { userId: +userId },
        process.env.SECRETKEY,
        {
          expiresIn: "12h",
        },
      );
      const newrefreshtoken = jwt.sign(
        { userId: +userId },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );
      return res
        .status(201)
        .json({ accesstoken: newaccesstoken, refreshtoken: newrefreshtoken });
    } catch (err) {
      next(err);
    }
  };
  kakaoToken = async (req, res, next) => {
    try {
      const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.RESTAPI}&redirect_uri=${process.env.REDIRECTURI}`;
      res.redirect(url);
    } catch (err) {
      next(err);
    }
  };
  getkakaoToken = async (req, res, next) => {
    try {
      const kakao = {
        clientID: process.env.RESTAPI,
        clientSecret: process.env.CLIENTSECRET,
        redirectUri: process.env.REDIRECTURI,
        logouturi: process.env.LOGOUTURI,
      };
      const tokenreq = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: {
          grant_type: "authorization_code",
          client_id: kakao.clientID,
          client_secret: kakao.clientSecret,
          redirectUri: kakao.redirectUri,
          code: req.query.code,
        },
      });
      const { access_token } = tokenreq.data;
      let user = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // req.seesion.kakao = user.data;
      const { email, profile } = user.data.kakao_account;
      const name = profile.name;
      const accesstoken = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.JWT_TOKEN,
        { expiresIn: "12h" },
      );
      res.cookie("authorization", `Bearer ${accesstoken}`);
      return res.status(200).json({ message: "로그인 성공" });
    } catch (err) {
      next(err);
    }
  };
  logout = async (req, res, next) => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.RESTAPI}&logout_redirect_uri=${process.env.LOGOUTURI}`;
      res.redirect(kakaoAuthUrl);
    } catch (err) {
      next(err);
    }
  };
  kakaologout = async (req, res, next) => {
    try {
      return res.status(200).json({ message: "로그아웃 성공" });
    } catch (err) {
      next(err);
    }
  };
}
