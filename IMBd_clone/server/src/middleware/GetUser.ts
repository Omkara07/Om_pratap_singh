import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const GetUserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(404).json({ message: "Invalid token" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            res.status(401).json({ message: "Unauthorized User" });
            return;
        }

        if (typeof decoded === "object") {
            req.body.id = decoded.id;
            next();  // Continue to the next middleware
            return;
        }

        res.status(401).json({ message: "Unauthorized User" });
        return;
    } catch (e) {
        res.status(401).json({ message: "Unauthorized User", error: e });
        return;
    }
};