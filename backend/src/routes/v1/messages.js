import express from "express";
import { getPaginatedDmsController, getPaginatedMessagesController } from "../../controllers/messageController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";


const router  = express.Router();

router.get('/dms/:conversationId', isAuthenticated, getPaginatedDmsController);

router.get('/:channelId/:workSpaceId', isAuthenticated, getPaginatedMessagesController);


export default router;