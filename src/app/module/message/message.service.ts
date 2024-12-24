import { PrismaClient } from '@prisma/client';
import { TMessage } from './message.interface';
import AppError from '../../errors/AppError';

const prisma = new PrismaClient();


const sendMessage = async (content: string, groupId: string, userId: string) => {
    try {

        const userGroup = await prisma.userGroup.findFirst({
            where: {
                userId: userId,
                groupId: groupId
            }
        });
        if (!userGroup) {
            throw new AppError(403, 'User is not part of the group');
        }

        const message = await prisma.message.create({
            data: {
                content,
                groupId,
                userId
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
