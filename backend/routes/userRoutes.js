const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = express.Router();
userRouter.get("/profile", authMiddleware, getUserProfile);

module.exports = userRouter;
