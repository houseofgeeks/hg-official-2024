import { Request, Response } from "express";
import { auth, db } from "../config/firebase.config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserRole } from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from 'express';


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