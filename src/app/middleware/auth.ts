import { NextFunction, Request, Response } from 'express';;
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TUserRole } from '../module/user/user.constant';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';



const authValidation = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.headers.authorization)

        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            throw new AppError(403, 'You have no token')
        }

        jwt.verify(token, config.jwtAccessSecret as string, function (err, decoded) {
            if (err) {
                throw new AppError(403, 'Token is not varified')
            }

            const role = (decoded as JwtPayload).role

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(403, 'You have no access to this route')
            }

            req.user = decoded as JwtPayload
            next()

        });
    }
    )

};

export default authValidation;