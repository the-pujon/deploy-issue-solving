import { PrismaClient, Group, GroupType } from "@prisma/client";
import config from "../../config";
import jwt from 'jsonwebtoken'
import AppError from "../../errors/AppError";

const prisma = new PrismaClient()

const createGroup = async (name: string, createdBy: string, type: string, token: string): Promise<Group> => {

    const decoded = jwt.verify(token, config.jwtAccessSecret as string)


    if (!decoded) {
        throw new Error('Invalid token');
    }

    if (typeof decoded === 'string' || !('email' in decoded)) {
        throw new Error('Invalid token structure');
    }

    if (decoded.role !== "ADMIN") {
        throw new AppError(404, "You have no access to this route")
    }

    if (type !== GroupType.GENERAL_CHAT && type !== GroupType.ADMIN_CHAT) {
        throw new AppError(400, "Invalid group type. Must be either GENERAL_CHAT or ADMIN_CHAT.");
    }

    const existingGroup = await prisma.group.findUnique({
        where: {
            name: name
        }
    })

    if (existingGroup) {
        throw new AppError(400, "A group with this name already exists")
    }

    const GroupData = {
        createdBy,
        name,
        type: type as GroupType
    }

    const result = await prisma.group.create({
        data: GroupData
    })

    return result

};

const joinGroup = async (userId: string, groupId: string, token: string) => {
    const decoded = jwt.verify(token, config.jwtAccessSecret as string)
    if (!decoded) {
        throw new Error('Invalid token');
    }

    if (typeof decoded === 'string' || !('email' in decoded)) {
        throw new Error('Invalid token structure');
    }

    const group = await prisma.group.findUnique({
        where: {
            id: groupId
        }
    })

    if (!group) {
        throw new AppError(404, "Group not found");
    }

    if (group.type !== GroupType.ADMIN_CHAT && decoded.role !== "ADMIN") {
        throw new AppError(400, "Invalid group type. Must be either GENERAL_CHAT or ADMIN_CHAT.");
    }

    const userGroup = await prisma.userGroup.findFirst({
        where: {
            userId: userId,
            groupId: groupId
        }
    })

    if (userGroup) {
        throw new AppError(400, "You are already a member of this group");
    }

    const newUserGroup = await prisma.userGroup.create({
        data: {
            userId,
            groupId
        }
    })

    return newUserGroup
}

const viewGroup = async (groupId: string) => {
    try {
        const group = await prisma.group.findMany({
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
        })

        if (!group) {
            throw new Error('Group not found');
        }

        return group

    } catch (er) {

    }
}

const viewAllGroups = async () => {
    try {
        const groups = await prisma.group.findMany({
            include: {
                userGroups: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!groups || groups.length === 0) {
            throw new Error('No groups found');
        }

        return groups;

    } catch (error) {
        console.error('Error fetching groups:', error);
        throw new Error('Failed to retrieve groups');
    }
};


export const groupService = {
    createGroup,
    joinGroup,
    viewGroup,
    viewAllGroups
}