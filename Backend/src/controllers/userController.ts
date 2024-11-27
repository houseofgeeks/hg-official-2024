import { Request, Response } from "express";
import { db } from "../config/firebase.config";
import { collection, doc, getDoc, getDocs, updateDoc, where, query } from "firebase/firestore";
import { User, UserRole } from "../models/userModel";
import { Wing } from "../models/eventModel";
import { StatusCodes } from "http-status-codes";

export const assignWings = async (req: Request & { user?: User }, res: Response): Promise<void> => {
    const { userId, wings }: { userId: string; wings: Wing[] } = req.body;
    const admin = req.user as User;

    if (!admin) {
        res.status(401).json({ message: "Unauthorized: User not authenticated" });
        return;
    }

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

export const showUserProfile = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    console.log(
        "user name is ", username
    )

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        console.log("Query Snapshot Size:", querySnapshot.size);

        if (querySnapshot.empty) {
            res.status(404).json({ message: "User not found with the provided username" });
            return;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as Partial<User>;

        if (!userData || !userData.username || !userData.name) {
            res.status(500).json({ message: "Invalid user data structure" });
            return;
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            profile: {
                uid: userData.uid,
                username: userData.username,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                emailVerified: userData.emailVerified,
                levels: userData.levels,
                assignedWings: userData.assignedWings || [],
            },
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);

        if (error instanceof Error && error.message.includes("Failed precondition")) {
            res.status(400).json({
                message: "Ensure the 'username' field is properly indexed in Firestore.",
            });
        } else {
            res.status(500).json({ message: "Error fetching user profile" });
        }
    }
};
export const editUserProfile = async (req: Request, res: Response): Promise<void> => {
    const { username, githubLink, linkedinLink, portfolioLink, Bio, Branch, Skills } = req.body;

    console.log("Received Username:", username);

    if (!username) {
        res.status(400).json({ message: "Username is required" });
        return;
    }

    try {
        const userQuery = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);

        const updatedData: Partial<User> = {
            githubLink: githubLink || "",
            linkedinLink: linkedinLink || "",
            portfolioLink: portfolioLink || "",
            Bio: Bio || "",
            Branch: Branch || "",
            Skills: Skills || ""
        };

        Object.keys(updatedData).forEach((key) => {
            if (updatedData[key as keyof User] === undefined) {
                delete updatedData[key as keyof User];
            }
        });

        await updateDoc(userRef, updatedData);

        res.status(200).json({ message: "Profile updated successfully", updatedData });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
};