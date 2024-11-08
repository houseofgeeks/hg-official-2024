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
            creatorId: user?.uid
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

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const eventSnapshot = await getDocs(collection(db, 'events'));
        const events = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(StatusCodes.OK).json(events);
    }
    catch (error) {
        console.log("Error is ", error);
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Couldnt fetch events",
            details: error
        })
    }
}

export const getEventsByWing = async (req: Request, res: Response) => {
    const wing = req.params.wing as Wing

    try {
        const eventBywing = query(collection(db, 'events'), where("wing", "==", wing));
        const wingEventsSnapshot = await getDocs(eventBywing);
        const wingEvents = wingEventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(StatusCodes.OK).json(wingEvents);

    }
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Failed to fetch wing events ",
            details: error
        })
    }
}


export const updateEvent = async (req: Request & { user?: User }, res: Response) => {

    const { eventId } = req.params;
    const user = req.user as User;
    if (user?.role !== UserRole.LEAD && user?.role !== UserRole.ADMIN) {
        res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Unauthorized to create Event"
        })
        return;
    }
    try {
        const eventDoc = doc(db, 'events', eventId);
        const ExistingEvent = await getDoc(eventDoc);
        if (!ExistingEvent.exists()) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Event doesnt exist"
            })
            return;
        }
        await updateDoc(eventDoc, {
            ...req.body,
            updatedAt: Timestamp.now()
        })
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Event updated successfully"
        })


    }
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            details: error,
            success: false
        })
    }


}


export const deleteEvent = async (req: Request & { user?: User }, res: Response) => {
    const { eventId } = req.params;
    console.log('eventID is ', eventId);
    const user = req.user as User
    if (user?.role !== UserRole.LEAD && user?.role !== UserRole.ADMIN) {
        res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Unauthorized to delete Event"
        })
        return;
    }
    try {
        const msg = await deleteDoc(doc(db, 'events', eventId));
        console.log("msg is ", msg)
        res.status(StatusCodes.OK).json({
            message: "Succesffully detleted event ",
            success: true
        })

    }
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Coudlnt delte the event",
            sucess: false
        })
    }

}