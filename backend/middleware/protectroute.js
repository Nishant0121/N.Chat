import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: " + error.message,
    });
  }
};

export default ProtectRoute;
