import express from 'express';
import { protectRoutes } from '../middlewares/auth.middleware.js';
import { getUsersForSideBar, getMessagesWithUser, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoutes, getUsersForSideBar)
router.get('/:userId', protectRoutes, getMessagesWithUser)
router.post('/send/:userId', protectRoutes, sendMessage)
// router.post()

export default router