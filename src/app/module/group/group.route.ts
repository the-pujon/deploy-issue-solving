

import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { groupValidation } from './group.validation';
import { groupController } from './group.controller';


const router = express.Router();

router.post(
    '/create-group/:createdBy',
    // authValidation(USER_ROLE.ADMIN),
    // validateRequest(groupValidation.createGroupValidation),
    groupController.groupCreation
);

export const groupRoute = router