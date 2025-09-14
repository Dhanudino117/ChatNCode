import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ error: "Token missing, unauthorized user" });
    }

    // Check blacklist
    const isBlackListed = await redisClient.get(token);
    if (isBlackListed) {
      res.clearCookie("token");
      return res.status(401).json({ error: "Token blacklisted, unauthorized user" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
