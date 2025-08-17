import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization!;
    try {
        const decodedData = jwt.verify(header, process.env.JWT_SECRET!)
        req.userId = decodedData.sub as string;
        next()
    } catch (e) {
        res.status(403).send("");
    }
}