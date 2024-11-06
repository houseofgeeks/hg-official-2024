// src/types/express/index.d.ts
import { User } from '../../models/userModel'; // Adjust this based on where the User type is located

declare global {
    namespace Express {
        interface Request {
            user?: User; // The user property is now of type User
        }
    }
}
