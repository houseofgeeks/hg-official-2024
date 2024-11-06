export enum UserRole {
    STUDENT = 'student',
    COORDINATOR = 'coordinator',
    LEAD = 'lead',
    ADMIN = 'admin',
}

export interface User {
    uid: string;
    email: string;
    role: UserRole;
    emailVerified: boolean;
}