import express from 'express'
import { groupController } from './group.controller';


const router = express.Router();

router.post(
    '/create-group/:createdBy',
    // validateRequest(groupValidation.createGroupValidation),
    groupController.groupCreation
);
router.post(
    '/join-group/:userId/:groupId',
    // validateRequest(groupValidation.createGroupValidation),
    groupController.joinGroup
);

export const groupRoute = router