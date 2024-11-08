import { Request, Response } from "express";
import { db } from '../config/firebase.config';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Event, Wing } from '../models/eventModel';
import { StatusCodes } from "http-status-codes";
import { User, UserRole } from "../models/userModel";

export const createEvent = async (req: Request & { user?: User }, res: Response) => {
    const user = req.user as User;
    console.log("Req is ", req);
    console.log("USER IS ", user)
    if (user?.role !== UserRole.LEAD && user?.role !== UserRole.ADMIN) {
        res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Unauthorized to create Event"
        })
        return;
    }
    const { title, wing, date, images, description } = req.body;
    try {
        const newEvent: Event = {
            title,
            wing,
            date: Timestamp.fromDate(new Date(date)),
            images,
            description,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            creatorId: user?.uid || "moye"
        }
        console.log(title, wing, date, images, description);
        if (!title || !wing || !date || !images || !description) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Missing required fields",
            });
            return;
        }
        const eventDoc = doc(collection(db, 'events'));
        await setDoc(eventDoc, newEvent);
        res.status(StatusCodes.CREATED).json({
            sucess: true,
            message: "Event Created Successfully"
        })



    }
    catch (error) {
        console.log("ERRO RI S", error)
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Failed to create an event"
        })
    }

}

