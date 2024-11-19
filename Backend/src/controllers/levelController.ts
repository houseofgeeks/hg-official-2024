import { Request, Response } from "express";
import { db } from "../config/firebase.config";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { LevelUpRequest } from "../models/requestModel";
import { User } from "../models/userModel"; // Import the Wing enum
import { Wing } from "../models/eventModel";

export const submitLevelUpRequest = async (req: Request, res: Response): Promise<void> => {
    const { userId, wing, proofOfWork } = req.body;

    // Validate if the requested level is valid (cannot be higher than level 5)
    // if (requestedLevel > 5 || requestedLevel <= 0) {
    //     res.status(400).json({ message: "Invalid level requested" });
    //     return; // Early return to prevent further execution
    // }

    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.data() as User;

        if (!userData) {
            res.status(404).json({ message: "User not found" });
            return; // Early return to prevent further execution
        }

        // Ensure levels is typed as Record<Wing, number>
        const userLevels = userData.levels as Record<Wing, number>;
        console.log(userLevels)
        // Log the userLevels to check its contents
        console.log("User Levels:", userLevels);

        // Check if userLevels exists and is a valid object
        // if (!userLevels || typeof userLevels !== 'object') {
        //     res.status(500).json({ message: "User levels not found or invalid" });
        //     return; // Early return to prevent further execution
        // }

        // Log wing and check if it's a valid key in userLevels
        // console.log("Requested Wing:", wing);

        // // Assume that if the `wing` doesn't exist in `userLevels`, it's at level 0
        // const currentLevel = userLevels[wing as Wing] || 0; // Default to level 0 if wing doesn't exist

        // // Log the current level
        // console.log("Current Level:", currentLevel);

        // // Check if the requested level is the next level (currentLevel + 1)
        // if (requestedLevel !== currentLevel + 1) {
        //     res.status(400).json({
        //         message: `You can only request the next level (current level: ${currentLevel})`
        //     });
        //     return; // Early return to prevent further execution
        // }

        // // Prevent level-up if the user is already at level 5
        // if (currentLevel >= 5) {
        //     res.status(400).json({ message: "You have reached the maximum level" });
        //     return; // Early return to prevent further execution
        // }

        // const newRequest: LevelUpRequest = {
        //     userId,
        //     wing,
        //     proofOfWork,
        //     status: "pending",
        //     createdAt: new Date() as any,
        // };

        // const requestRef = doc(collection(db, "levelUpRequests"));
        // await setDoc(requestRef, newRequest);

        // Successfully submitted level-up request
        res.status(201).json({ message: "Level-up request submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting level-up request" });
    }
};
