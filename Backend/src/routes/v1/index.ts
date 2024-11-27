import express, { Router } from 'express';
import { registerUser, loginUser, authenticateJWT, getUserRole } from '../../controllers/authController'
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../../controllers/eventController';
import { assignWings, editUserProfile, showUserProfile } from '../../controllers/userController';
import { acceptLevelUpRequest, getPendingRequestsByWing, rejectLevelUpRequest, submitLevelUpRequest } from '../../controllers/levelController';
const router: Router = express.Router();


//Authentication Routes
router.post('/signup', registerUser);
router.post("/signin", loginUser);

// Role route (Authenticated route to get user role)
router.get("/role", authenticateJWT, getUserRole);

//Event Routes
router.post("/event", authenticateJWT, createEvent);
router.get("/wing", getAllEvents);
router.get("/event/:id", getEventById);
router.delete("/event/:eventId", authenticateJWT, deleteEvent);
router.put("/event/:eventId", authenticateJWT, updateEvent);

// Admin Routes
// input format -> userId(uuid),wings= [](array format m dena) also sirf admin dega permission
router.post("/assign-wings", authenticateJWT, assignWings);
// For profile page to get all deatail using username 
router.get("/user/:username", showUserProfile);
router.patch("/editprofile", editUserProfile)


//Level Routes
// Takes these as  input 
// userId: string;
//     wing: Wing; // refer to eventModel.ts in models for Wing Names, follow strictly
//     proofOfWork: string

router.post("/requests", authenticateJWT, submitLevelUpRequest);
// Gets all pending requests by wing Name 
router.get("/requests/:wing/pending", authenticateJWT, getPendingRequestsByWing);
// here give the request id and rest is done already
router.patch("/requests/:requestId/accept", authenticateJWT, acceptLevelUpRequest);
// when we reject a request
router.patch("/requests/:requestId/reject", authenticateJWT, rejectLevelUpRequest);


export default router;