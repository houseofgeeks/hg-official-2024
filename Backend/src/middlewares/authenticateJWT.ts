import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateJWT = (req: Request, res: Response, next: Function) => {
    const token = req.cookies["token"];
    if (!token) return res.status(403).json({
        signin: false,
        message: "Access Denied"
    })
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Invalid token", authenticate: false });
        req.user = decoded;
        next();
    })

}