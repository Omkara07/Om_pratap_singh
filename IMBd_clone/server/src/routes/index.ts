import express from "express";
import userRouter from "./user";
import moviesRouter from "./movies";
const router = express.Router()

router.use('/user', userRouter);
router.use('/movies', moviesRouter);

export default router