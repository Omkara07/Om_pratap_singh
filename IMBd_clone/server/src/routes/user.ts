import express, { Request, Response } from "express";
import { prisma } from "../db";
import { z } from 'zod'
import jwt from 'jsonwebtoken';
import { GetUserMiddleware } from "../middleware/GetUser";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from user");
});

router.post("/signup", async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return
        }

        else {
            const saltRounds = process.env.HASH_SALT_ROUNDS ? parseInt(process.env.HASH_SALT_ROUNDS) : 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const u = await prisma.user.create({
                data: {
                    email,
                    name: name.toLowerCase(),
                    password: passwordHash
                }
            })
            const token = await jwt.sign({ id: u.id }, process.env.JWT_SECRET as string);
            res.status(200).json({ token, email: u.email, name: u.name });
        }
    }
    catch (e) {
        res.status(500).json({ message: "Error creating user", error: e })
    }
});

router.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
            res.status(200).json({ token, email: user.email, name: user.name });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
})

router.get("/me", GetUserMiddleware, async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.body.id
        }
    })
    if (user) {
        res.status(200).json({ message: "User found", user })
    }
    else {
        res.status(404).json("User not found")
    }
})


export default router
