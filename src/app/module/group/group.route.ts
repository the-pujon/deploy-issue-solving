import express from 'express'
import { groupController } from './group.controller';
import validateRequest from '../../middleware/validateRequest';
import { groupValidation } from './group.validation';


const router = express.Router();

router.post(
    '/create-group/:createdBy',
    validateRequest(groupValidation.createGroupValidation),
    groupController.groupCreation
);
router.post(
    '/join-group/:userId/:groupId',
    groupController.joinGroup
);
router.get(
    '/see-group/:groupId',
    groupController.viewGroup
);
router.get(
    '/see-group',
    groupController.viewAllGroup
);

export const groupRoute = router