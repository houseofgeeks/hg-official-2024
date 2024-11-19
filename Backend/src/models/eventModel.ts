import { Timestamp } from "firebase/firestore";
export enum Wing {
    CP = "CP",
    SD = 'SD',
    ML_AI = 'ML/AI',
    IOT_ROBOTICS = 'IOT and Robotics',
    ARCANUM = 'Arcanum',
    CYBERSECURITY = 'Cyber Security'
}

export interface Event {
    id?: string;
    title: string;
    wing: Wing;
    date: Timestamp;
    images: string[];
    description: string,
    createdAt: Timestamp;
    updatedAt: Timestamp;
    creatorId?: string
}