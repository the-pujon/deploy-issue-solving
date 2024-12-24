import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { messageController } from './message.controller';



const router = express.Router();

router.post(
    '/send/:groupId/:userId',
    // validateRequest(userValidation.createUserValidation),
    messageController.sentMessage,
);
router.get(
    '/view/:groupId',
    messageController.viewMessage,
);

export const messageRoute = router