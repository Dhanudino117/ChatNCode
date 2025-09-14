import User from "../model/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    const token = await user.generateJWT();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT
    const token = await user.generateJWT();

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    user: req.user,
  });
};

export const logoutController = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    // blacklist token in redis for 1 hour (adjustable)
    await redisClient.set(token, "logout", "EX" ,60 * 60 * 1 );

    // Clear the cookie on the server side
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
