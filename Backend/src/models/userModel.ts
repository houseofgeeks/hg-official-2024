import { Wing } from "./eventModel";

export enum UserRole {
    STUDENT = 'student',
    COORDINATOR = 'coordinator',
    LEAD = 'lead',
    ADMIN = 'admin',
}

export interface User {
    uid: string;
    email: string;
    username: string;
    name: string;
    role: UserRole;
    emailVerified: boolean;
    levels: Record<Wing, number>;
    assignedWings?: Wing[];
}

