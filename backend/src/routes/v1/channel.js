import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { getChannelByIdController } from '../../controllers/channelController.js';

const router = express.Router();


router.get('/:channelId', isAuthenticated, getChannelByIdController);

router.get('/drafs', isAuthenticated, (req, res) => {
    res.json({
        message: 'No drafs found'
    })
})

export default router;