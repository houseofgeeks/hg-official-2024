import express, { Router } from 'express';
import { registerUser, loginUser, authenticateJWT, getUserRole } from '../../controllers/authController'
const router: Router = express.Router();

router.post('/signup', registerUser);
router.post("/signin", loginUser);

// Role route (Authenticated route to get user role)
router.get("/role", authenticateJWT, getUserRole);

export default router;