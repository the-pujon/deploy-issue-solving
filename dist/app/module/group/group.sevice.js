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
exports.groupService = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma = new client_1.PrismaClient();
const createGroup = (name, createdBy, type, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtAccessSecret);
    if (!decoded) {
        throw new Error('Invalid token');
    }
    if (typeof decoded === 'string' || !('email' in decoded)) {
        throw new Error('Invalid token structure');
    }
    if (decoded.role !== "ADMIN") {
        throw new AppError_1.default(404, "You have no access to this route");
    }
    if (type !== client_1.GroupType.GENERAL_CHAT && type !== client_1.GroupType.ADMIN_CHAT) {
        throw new AppError_1.default(400, "Invalid group type. Must be either GENERAL_CHAT or ADMIN_CHAT.");
    }
    const existingGroup = yield prisma.group.findUnique({
        where: {
            name: name
        }
    });
    if (existingGroup) {
        throw new AppError_1.default(400, "A group with this name already exists");
    }
    const GroupData = {
        createdBy,
        name,
        type: type
    };
    const result = yield prisma.group.create({
        data: GroupData
    });
    return result;
});
const joinGroup = (userId, groupId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtAccessSecret);
    if (!decoded) {
        throw new Error('Invalid token');
    }
    if (typeof decoded === 'string' || !('email' in decoded)) {
        throw new Error('Invalid token structure');
    }
    const group = yield prisma.group.findUnique({
        where: {
            id: groupId
        }
    });
    if (!group) {
        throw new AppError_1.default(404, "Group not found");
    }
    if (group.type !== client_1.GroupType.ADMIN_CHAT && decoded.role !== "ADMIN") {
        throw new AppError_1.default(400, "Invalid group type. Must be either GENERAL_CHAT or ADMIN_CHAT.");
    }
    const userGroup = yield prisma.userGroup.findFirst({
        where: {
            userId: userId,
            groupId: groupId
        }
    });
    if (userGroup) {
        throw new AppError_1.default(400, "You are already a member of this group");
    }
    const newUserGroup = yield prisma.userGroup.create({
        data: {
            userId,
            groupId
        }
    });
    return newUserGroup;
});
const viewGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield prisma.group.findMany({
            where: {
                id: groupId
            },
            include: {
                userGroups: {
                    include: {
                        user: true
                    }
                }
            }
        });
        if (!group) {
            throw new Error('Group not found');
        }
        return group;
    }
    catch (er) {
    }
});
exports.groupService = {
    createGroup,
    joinGroup,
    viewGroup
};
