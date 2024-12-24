import { PrismaClient, Group } from "@prisma/client";
import config from "../../config";
import jwt from 'jsonwebtoken'
import AppError from "../../errors/AppError";

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

    if(decoded.role !== "ADMIN"){
        throw new AppError(404,"You have no access to this route")
    }

    const existingGroup = await prisma.group.findUnique({
        where : {
            name : name
        }
    })

    if(existingGroup){
        throw new AppError (400, "A group with this name already exists")
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