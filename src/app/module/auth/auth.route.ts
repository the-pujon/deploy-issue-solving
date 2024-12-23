import express from 'express'

import { AuthValidation } from './auth.validation'
import validateRequest from '../../middleware/validateRequest'
import { authController } from './authController'

const router = express.Router()

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    authController.loginUser)

export const authRoute = router