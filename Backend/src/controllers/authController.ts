import { Request, Response } from "express";
import { auth, db } from "../config/firebase.config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserRole, User } from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import { Wing } from "../models/eventModel";
interface userData {
    role: UserRole;
    name: string;
    username: string;
    levels: Record<Wing, number>;
}
const generateToken = (uid: string, role: UserRole, username: string): string => {
    return jwt.sign({ uid, role, username }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

interface SignupRequest {
    email: string;
    password: string;
    name: string;
    username: string;
    role: UserRole;
}

interface SigninRequest {
    email: string;
    password: string;

}export const registerUser = async (req: Request, res: Response) => {
    const { email, password, role, name, username } = req.body;

    // Validate input fields
    if (!email || !password || !role || !name || !username) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "All fields (email, password, role, name, username) are required.",
            success: false,
        });
        return;
    }

    try {
        // Create a Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Initialize levels for each wing
        const levels: Record<Wing, number> = Object.values(Wing).reduce((acc, wing) => {
            acc[wing as Wing] = 0; // Default level is 0
            return acc;
        }, {} as Record<Wing, number>);

        // Prepare user data for Firestore
        const userData: userData = {
            role,
            name,
            username,
            levels,
        };

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), userData);

        // Send email verification
        await sendEmailVerification(user);

        // Respond with success
        res.status(StatusCodes.OK).json({
            message: "User registered successfully. Please verify your email.",
            success: true,
        });
    } catch (error: any) {
        console.error("Error during registration:", error);

        // Distinguish Firebase errors
        const firebaseErrorMessage =
            error.code === "auth/email-already-in-use"
                ? "Email is already in use."
                : "An error occurred during registration.";

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: firebaseErrorMessage,
            error: error.message,
            success: false,
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
        const username = userData.username;

        const token = generateToken(user.uid, role, username);

        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(200).json({
            message: "Login successful",
            role,
            username: username
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
        role: user.role,
        username: user.username
    });
};