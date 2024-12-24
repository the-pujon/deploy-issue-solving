"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const authController_1 = require("./authController");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), authController_1.authController.loginUser);
exports.authRoute = router;
