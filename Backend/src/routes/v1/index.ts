import express, { Router } from 'express';
import { registerUser, loginUser, authenticateJWT, getUserRole } from '../../controllers/authController'
import { createEvent, getAllEvents, getEventsByWing } from '../../controllers/eventController';
const router: Router = express.Router();

//Authentication Routes
router.post('/signup', registerUser);
router.post("/signin", loginUser);

// Role route (Authenticated route to get user role)
router.get("/role", authenticateJWT, getUserRole);

//Event Routes
router.post("/event", authenticateJWT, createEvent);
router.get("/wing", getAllEvents);
router.get("/wing/:wing", getEventsByWing);

export default router;