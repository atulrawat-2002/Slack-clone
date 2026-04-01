import express from 'express';
import { addChannelToWorkSpaceController, addMemberToWorkSpaceController, createWorkSpaceController, deleteWorkSpaceController, getAllExistingWorkspacesController, getAllWorkSpaceUserIsMemberOfController, getWorkSpaceByJoinCodeController, getWorkSpaceController, joinWorkspaceController, resetWorkspaceJoinCodeController, updatedWorkSpaceController } from '../../controllers/workSpaceController.js';
import {createWorkSpaceSchema, addChannelToWorkSpaceSchema, addMemberToWorkSpaceScehma } from '../../validators/workSpaceSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated ,validate(createWorkSpaceSchema) ,createWorkSpaceController);

router.get('/', isAuthenticated, getAllWorkSpaceUserIsMemberOfController);

router.delete('/:workSpaceId', isAuthenticated, deleteWorkSpaceController);

router.get('/fetch/allWorkspaces', isAuthenticated, getAllExistingWorkspacesController);

router.get('/get/:workSpaceId', isAuthenticated, getWorkSpaceController);

router.put('/:workSpaceId/join', isAuthenticated, joinWorkspaceController);

router.get('/join/:joinCode', isAuthenticated, getWorkSpaceByJoinCodeController);

router.put('/:workSpaceId', isAuthenticated, updatedWorkSpaceController);

router.put('/:workSpaceId/members', isAuthenticated, validate(addMemberToWorkSpaceScehma), addMemberToWorkSpaceController);

router.put('/:workSpaceId/channels', isAuthenticated, validate(addChannelToWorkSpaceSchema), addChannelToWorkSpaceController);

router.put('/:workspaceId/joincode/reset', isAuthenticated, resetWorkspaceJoinCodeController);


export default router;