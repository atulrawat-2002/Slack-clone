import express from "express";

import userRouter from './users.js'
import workSpaceRouter from './workSpace.js'
import channelRouter from './channel.js';

const router = express.Router();


router.use('/users', userRouter);
router.use('/workspace', workSpaceRouter);
router.use('/channel', channelRouter)

export default router;