import { Request, Response } from "express";
import { db } from "../config/firebase.config";
import { doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import { LevelUpRequest } from "../models/requestModel";
import { User } from "../models/userModel"; // Importe the Wing enum
import { Wing } from "../models/eventModel";

export const submitLevelUpRequest = async (req: Request, res: Response): Promise<void> => {
    const { userId, wing, proofOfWork, name } = req.body;

    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        const userData = userDoc.data() as User;

        if (!userData) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const requestsRef = collection(db, "levelUpRequests");
        const recentRequestsQuery = query(
            requestsRef,
            where("userId", "==", userId),
            where("wing", "==", wing),
            where("createdAt", ">", Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000))) // 3 days before new request for now
        );

        const recentRequestsSnapshot = await getDocs(recentRequestsQuery);

        // If there are any recent requests, reject the new one
        if (!recentRequestsSnapshot.empty) {
            res.status(400).json({ message: "You must wait 3 days before submitting another request for this wing." });
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
            name,
            proofOfWork,
            currentLevel,
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



export const getPendingRequestsByWing = async (req: Request, res: Response): Promise<void> => {
    const { wing } = req.params;


    try {
        const requestsRef = collection(db, "levelUpRequests");
        const q = query(
            requestsRef,
            where("wing", "==", wing),
            where("status", "==", "pending")
        );
        const querySnapshot = await getDocs(q);

        const pendingRequests: LevelUpRequest[] = [];
        querySnapshot.forEach(doc => {
            const data = doc.data() as LevelUpRequest;
            pendingRequests.push({
                ...data,
                requestId: doc.id,
            });
        });



        res.status(200).json({
            message: `Pending level-up requests for wing ${wing}`,
            requests: pendingRequests,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching pending level-up requests" });
    }
};
export const acceptLevelUpRequest = async (req: Request & { user?: User }, res: Response): Promise<void> => {
    const { requestId } = req.params;
    const user = req.user as User;

    if (!user) {
        res.status(401).json({ message: "Unauthorized: User information is missing" });
        return;
    }

    const { uid, role } = user;

    try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            res.status(404).json({ message: "User not found in Firestore" });
            return;
        }

        const fullUserData = userDoc.data() as User;
        const userWing = fullUserData.assignedWings;

        if (!userWing || userWing.length === 0) {
            res.status(404).json({ message: "You are not assigned to any wings" });
            return;
        }

        const requestRef = doc(db, "levelUpRequests", requestId);
        const requestDoc = await getDoc(requestRef);

        if (!requestDoc.exists()) {
            res.status(404).json({ message: "Request not found" });
            return;
        }

        const requestData = requestDoc.data() as LevelUpRequest;

        if (requestData.status !== "pending") {
            res.status(400).json({ message: "Request is not pending" });
            return;
        }

        if (role !== "admin" && role !== "lead" && role !== "coordinator") {
            res.status(403).json({ message: "Unauthorized: You do not have permission to accept requests" });
            return;
        }

        if (role !== "admin" && !userWing.includes(requestData.wing)) {
            res.status(403).json({ message: "Unauthorized: You can only manage requests for your assigned wings" });
            return;
        }

        const requesterRef = doc(db, "users", requestData.userId);
        const requesterDoc = await getDoc(requesterRef);

        if (!requesterDoc.exists()) {
            res.status(404).json({ message: "Requester not found" });
            return;
        }

        const requesterData = requesterDoc.data() as User;
        const userLevels = requesterData.levels || {};

        const currentLevel = userLevels[requestData.wing as Wing] || 0;
        userLevels[requestData.wing as Wing] = currentLevel + 1;

        await updateDoc(requesterRef, { levels: userLevels });

        await updateDoc(requestRef, { status: "accepted" });

        res.status(200).json({
            message: "Request accepted successfully",
            updatedUser: {
                userId: requestData.userId,
                updatedLevels: userLevels,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accepting the request" });
    }
};
export const rejectLevelUpRequest = async (req: Request & { user?: User }, res: Response): Promise<void> => {
    const { requestId } = req.params;
    const user = req.user as User;

    if (!user) {
        res.status(401).json({ message: "Unauthorized: User information is missing" });
        return;
    }

    const { uid, role } = user;

    try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            res.status(404).json({ message: "User not found in Firestore" });
            return;
        }

        const fullUserData = userDoc.data() as User;
        const userWing = fullUserData.assignedWings;

        if (!userWing || userWing.length === 0) {
            res.status(404).json({ message: "You are not assigned to any wings" });
            return;
        }

        const requestRef = doc(db, "levelUpRequests", requestId);
        const requestDoc = await getDoc(requestRef);

        if (!requestDoc.exists()) {
            res.status(404).json({ message: "Request not found" });
            return;
        }

        const requestData = requestDoc.data() as LevelUpRequest;

        if (requestData.status !== "pending") {
            res.status(400).json({ message: "Request is not pending" });
            return;
        }

        if (role !== "admin" && role !== "lead" && role !== "coordinator") {
            res.status(403).json({ message: "Unauthorized: You do not have permission to accept requests" });
            return;
        }

        if (role !== "admin" && !userWing.includes(requestData.wing)) {
            res.status(403).json({ message: "Unauthorized: You can only manage requests for your assigned wings" });
            return;
        }

        const requesterRef = doc(db, "users", requestData.userId);
        const requesterDoc = await getDoc(requesterRef);

        if (!requesterDoc.exists()) {
            res.status(404).json({ message: "Requester not found" });
            return;
        }




        await updateDoc(requestRef, { status: "rejected" });

        res.status(200).json({
            message: "Request rejected successfully",
            updatedUser: {
                userId: requestData.userId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error accepting the request" });
    }
};