"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const SendResponse_1 = __importDefault(require("../../utils/SendResponse"));
const message_service_1 = require("./message.service");
const server_1 = require("../../../server");
const sentMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId } = req.params;
    const { content } = req.body;
    const result = yield message_service_1.messageService.sendMessage(content, groupId, userId);
    server_1.io.emit('receiveMessage', content);
    (0, SendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Message Sent Successfully',
        data: result
    });
}));
const viewMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    const result = yield message_service_1.messageService.viewMessage(groupId);
    (0, SendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Message retrived Successfully',
        data: result
    });
}));
exports.messageController = {
    sentMessage,
    viewMessage
};
