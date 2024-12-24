import { PrismaClient, Group } from "@prisma/client";
import config from "../../config";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const createGroup = async (name: string,  createdBy: string, token: string): Promise<Group> => {

    const decoded = jwt.verify(token, config.jwtAccessSecret as string)
    console.log(decoded)

    if (!decoded) {
        throw new Error('Invalid token');
    }

    if (typeof decoded === 'string' || !('email' in decoded)) {
        throw new Error('Invalid token structure');
    }

    const GroupData = {
        createdBy ,
        name 
    }

    console.log(GroupData)

    const result = await prisma.group.create({
        data: GroupData
    })

    return result

};

export const groupService = {
    createGroup
}