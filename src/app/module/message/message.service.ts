import { PrismaClient } from '@prisma/client';
import AppError from '../../errors/AppError';
import config from '../../config';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();


const sendMessage = async (content: string, groupId: string, userId: string,token: string) => {
    try {
        const decoded = jwt.verify(token, config.jwtAccessSecret as string)

        if (!decoded) {
            throw new Error('Invalid token');
        }

        if (typeof decoded === 'string' || !('email' in decoded)) {
            throw new Error('Invalid token structure');
        }

        const userName = decoded?.name
        
        const userGroup = await prisma.userGroup.findFirst({
            where: {
                userId: userId,
                groupId: groupId,
                
            }
        });
        if (!userGroup) {
            throw new AppError(403, 'User is not part of the group');
        }

        const message = await prisma.message.create({
            data: {
                content,
                groupId,
                userId,
                userName
            },
        });
        return message;
    } catch (error) {
        throw new Error('Error creating message: ' + error);
    }
}


const viewMessage = async (groupId:string) => {
    try{
        const message = await prisma.message.findMany({
            where : {
                groupId : groupId
            },
            include : {
                user : true
            },
            orderBy : {
                createdAt : 'asc'
            }
        })
        return message

    }catch (er){

    }
}

export const messageService = {
    sendMessage,
    viewMessage
}
