import { Request, Response } from "express";
import { auth, db } from "../config/firebase.config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserRole, User } from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
const generateToken = (uid: string, role: UserRole): string => {
    return jwt.sign({ uid, role }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

interface SignupRequest {
    email: string;
    password: string;
    role: UserRole;
}

interface SigninRequest {
    email: string;
    password: string;
}

export const registerUser: RequestHandler = async (req: Request<{}, {}, SignupRequest>, res: Response) => {
    const { email, password, role } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), { role });
        await sendEmailVerification(user);
        res.status(200).json({ message: 'Please verify your email to activate your account.' });
    } catch (error) {
        console.log("error is ", error)
        res.status(StatusCodes.BAD_GATEWAY).json({
            error: 'couldnt sign in',
            success: false
        });
    }
};
export const loginUser: RequestHandler = async (req: Request<{}, {}, SignupRequest>, res: Response) => {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            res.status(StatusCodes.FORBIDDEN).json({
                message: "Email not verified. Please check your inbox.",
                success: false
            });
            return;
        }


        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (!userData || !userData.role) {
            res.status(StatusCodes.BAD_GATEWAY).json({
                message: "No role assigned to the user.",
                success: false
            });
            return;
        }

        const role: UserRole = userData.role;

        const token = generateToken(user.uid, role);

        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(200).json({
            message: "Login successful",
            role
        });

    } catch (error) {
        console.log("Error during login: ", error);
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Invalid email or password",
            success: false
        });
    }
};

export const authenticateJWT: RequestHandler = (req: Request & { user?: User }, res: Response, next: Function) => {
    const token = req.cookies["token"];

    if (!token) {
        res.status(StatusCodes.FORBIDDEN).json({
            message: "Access Denied",
            success: false
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) return res.status(StatusCodes.FORBIDDEN).json({
            message: "Invalid Token",
            success: false
        });

        req.user = decoded as User;
        next();
    });
};


export const getUserRole: RequestHandler = async (req: Request & { user?: User }, res: Response) => {
    const user = req.user as User;

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Not authenticated",
            success: false
        });
        return;
    }

    res.status(200).json({
        role: user.role
    });
};
