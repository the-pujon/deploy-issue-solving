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
exports.messageService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma = new client_1.PrismaClient();
const sendMessage = (content, groupId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userGroup = yield prisma.userGroup.findFirst({
            where: {
                userId: userId,
                groupId: groupId
            }
        });
        if (!userGroup) {
            throw new AppError_1.default(403, 'User is not part of the group');
        }
        const message = yield prisma.message.create({
            data: {
                content,
                groupId,
                userId
            },
        });
        return message;
    }
    catch (error) {
        throw new Error('Error creating message: ' + error);
    }
});
const viewMessage = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield prisma.message.findMany({
            where: {
                groupId: groupId
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return message;
    }
    catch (er) {
    }
});
exports.messageService = {
    sendMessage,
    viewMessage
};
