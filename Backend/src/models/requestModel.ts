import { Wing } from "./eventModel";
import { Timestamp } from "firebase/firestore";

export interface LevelUpRequest {
    id?: string;
    userId: string;
    wing: Wing;
    requestedLevel: number;
    proofOfWork: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Timestamp;
}
