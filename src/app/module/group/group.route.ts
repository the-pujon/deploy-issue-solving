

import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { groupValidation } from './group.validation';
import { groupController } from './group.controller';
import authValidation from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.post(
    '/create-group',
    // authValidation(USER_ROLE.ADMIN),
    // validateRequest(groupValidation.createGroupValidation),
    groupController.groupCreation
);

export const groupRoute = router