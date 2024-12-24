"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRoute = void 0;
const express_1 = __importDefault(require("express"));
const group_controller_1 = require("./group.controller");
const router = express_1.default.Router();
router.post('/create-group/:createdBy', 
// validateRequest(groupValidation.createGroupValidation),
group_controller_1.groupController.groupCreation);
router.post('/join-group/:userId/:groupId', 
// validateRequest(groupValidation.createGroupValidation),
group_controller_1.groupController.joinGroup);
router.get('/see-group/:groupId', group_controller_1.groupController.viewGroup);
exports.groupRoute = router;
