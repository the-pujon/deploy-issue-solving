import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { jwtHelpers } from "../../utils/jwt.helper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const prisma = new PrismaClient()

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        name : userData.name,
        id : userData.id
    },
        config.jwtAccessSecret as Secret,
        config.JWT_ACCESS_EXPIRES_IN as string
    );

    // const refreshToken = jwtHelpers.generateToken({
    //     email: userData.email,
    //     role: userData.role
    // },
    //     config.jwt.refresh_token_secret,
    //     config.jwt.refresh_token_expires_in as string
    // );

    return {
        accessToken,
        userData
        // refreshToken,
    };
};

export const AuthService = {
    loginUser
}