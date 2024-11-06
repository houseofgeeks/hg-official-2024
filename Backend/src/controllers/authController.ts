import { Request, Response } from "express";
import { auth, db } from "../config/firebase.config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserRole } from "../models/userModel";
import { StatusCodes } from "http-status-codes";

interface SignupRequest {
    email: string;
    password: string;
    role: UserRole;
}

interface SigninRequest {
    email: string;
    password: string;
}

const registerUser = async (req: Request, res: Response) => {
    const { email, password, role }: SignupRequest = req.body;
    try {

    }
    catch (error) {

    }
}