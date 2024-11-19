import { Request, Response } from "express";
import { db } from "../config/firebase.config";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { LevelUpRequest } from "../models/requestModel";
import { User } from "../models/userModel"; // Import the Wing enum
import { Wing } from "../models/eventModel";

export const submitLevelUpRequest = async (req: Request, res: Response): Promise<void> => {
    const { userId, wing, proofOfWork } = req.body;

    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.data() as User;

        if (!userData) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userLevels = userData.levels as Record<Wing, number>;
        console.log(userLevels)

        console.log("User Levels:", userLevels);

        if (!userLevels || typeof userLevels !== 'object') {
            res.status(500).json({ message: "User levels not found or invalid" });
            return;
        }

        console.log("Requested Wing:", wing);

        const currentLevel = userLevels[wing as Wing] || 0;


        if (currentLevel >= 5) {
            res.status(400).json({ message: "You have reached the maximum level" });
            return;
        }

        const newRequest: LevelUpRequest = {
            userId,
            wing,
            proofOfWork,
            status: "pending",
            createdAt: new Date() as any,
        };

        const requestRef = doc(collection(db, "levelUpRequests"));
        await setDoc(requestRef, newRequest);

        res.status(201).json({ message: "Level-up request submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting level-up request" });
    }
};
