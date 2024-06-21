import express from "express";
import authRouter from "./auth.js";
import postRouter from "./posts.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);

export default router;
