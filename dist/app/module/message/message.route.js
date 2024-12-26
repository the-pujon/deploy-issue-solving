"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const message_controller_1 = require("./message.controller");
const message_validation_1 = require("./message.validation");
const router = express_1.default.Router();
router.post('/send/:groupId/:userId', (0, validateRequest_1.default)(message_validation_1.Validation.messageValidation), message_controller_1.messageController.sentMessage);
router.get('/view/:groupId', message_controller_1.messageController.viewMessage);
exports.messageRoute = router;
