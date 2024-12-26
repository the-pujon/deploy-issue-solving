import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { messageController } from './message.controller';
import { Validation } from './message.validation';



const router = express.Router();

router.post(
    '/send/:groupId/:userId',
    validateRequest(Validation.messageValidation),
    messageController.sentMessage,
);
router.get(
    '/view/:groupId',
    messageController.viewMessage,
);

export const messageRoute = router