import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decode.tokenData.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error: error.message });
  }
};

export default isAuthenticated;
