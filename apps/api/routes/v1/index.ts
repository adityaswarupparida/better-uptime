import { Router } from "express";
import websiteRouter from "./websites";
import userRouter from "./users";

const router = Router();
router.use("/user", userRouter);
router.use("/", websiteRouter);  // Removing website to keep endpoints same for both backends

export default router;