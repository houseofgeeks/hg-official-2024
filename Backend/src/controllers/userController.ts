import { Request, Response } from "express";
import { db } from "../config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User, UserRole } from "../models/userModel";
import { Wing } from "../models/eventModel";

export const assignWings = async (req: Request & { user?: User }, res: Response): Promise<void> => {
    const { userId, wings }: { userId: string; wings: Wing[] } = req.body;
    const admin = req.user as User;

    if (!admin) {
        res.status(401).json({ message: "Unauthorized: User not authenticated" });
        return;
    }

    // Check if wings is a valid array
    if (!Array.isArray(wings)) {
        res.status(400).json({ message: "Invalid wings format. It should be an array." });
        return;
    }

    try {
        const adminDoc = await getDoc(doc(db, "users", admin.uid));
        const adminData = adminDoc.data() as User;

        if (!adminData || adminData.role !== UserRole.ADMIN) {
            res.status(403).json({ message: "Unauthorized: Only admins can assign wings" });
            return;
        }

        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.data() as User;

        if (!userData) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Ensure wings is an array and handle merging
        const updatedWings = Array.from(new Set([...(userData.assignedWings || []), ...wings]));

        await updateDoc(doc(db, "users", userId), {
            assignedWings: updatedWings,
        });

        res.status(200).json({
            message: `Successfully assigned wings to user ${userId}`,
            assignedWings: updatedWings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error assigning wings", error: "Code showing error moye moye" });
    }
};
