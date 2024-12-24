"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoute = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const router = express_1.default.Router();
router.post('/send/:groupId/:userId', 
// validateRequest(userValidation.createUserValidation),
message_controller_1.messageController.sentMessage);
router.get('/view/:groupId', message_controller_1.messageController.viewMessage);
exports.messageRoute = router;
