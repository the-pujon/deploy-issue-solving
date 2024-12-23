
import * as bcrypt from 'bcrypt'
import { PrismaClient, User } from "@prisma/client";
import { Request } from 'express';

const prisma = new PrismaClient()

const createUser = async (req: Request): Promise<User> => {

    const hashedPassword: string = await bcrypt.hash(req.body.password, 6)

    const userData = {
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name
    }

    console.log(userData)

    const result = await prisma.user.create({
        data: userData
    })

    return result

};

export const userService = {
    createUser
}