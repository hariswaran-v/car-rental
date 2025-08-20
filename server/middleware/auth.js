import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }

  // Remove Bearer prefix if present
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Not authorized, token invalid or expired",
      });
  }
};
