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
exports.groupController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const SendResponse_1 = __importDefault(require("../../utils/SendResponse"));
const group_sevice_1 = require("./group.sevice");
const server_1 = require("../../../server");
const groupCreation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const { name, type } = req.body;
    const { createdBy } = req.params;
    const result = yield group_sevice_1.groupService.createGroup(name, createdBy, type, token);
    server_1.io.emit('group_created', result);
    (0, SendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Group created Successfully',
        data: result
    });
}));
const joinGroup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const { userId, groupId } = req.params;
    const result = yield group_sevice_1.groupService.joinGroup(userId, groupId, token);
    server_1.io.to(groupId).emit('user_joined', { userId, groupId });
    (0, SendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Join Group Successfully',
        data: result
    });
}));
const viewGroup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    const result = yield group_sevice_1.groupService.viewGroup(groupId);
    (0, SendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Group retrived Successfully',
        data: result
    });
}));
exports.groupController = {
    groupCreation,
    joinGroup,
    viewGroup
};
