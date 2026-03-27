import express from "express";

import userRouter from './users.js'
import workSpaceRouter from './workSpace.js'
import channelRouter from './channel.js';
import memberRouter from './members.js';
import messageRouter from './messages.js';
import paymentRouter from "./payments.js";

const router = express.Router();


router.use('/users', userRouter);

router.use('/workspace', workSpaceRouter);

router.use('/channel', channelRouter);

router.use('/member', memberRouter)

router.use('/messages', messageRouter)

router.use('/payments', paymentRouter);

export default router;