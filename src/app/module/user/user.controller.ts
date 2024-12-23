import { Request, Response } from "express"
import sendResponse from "../../utils/SendResponse"
import catchAsync from "../../utils/catchAsync"
import { userService } from "./user.service"


const signUpRegistration = catchAsync(async (req: Request, res: Response) => {
    // console.log(req)

    console.log( "req",req.body)

    const result = await userService.createUser(req)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User Registration Successfully',
        data: result
    })
})


export const userController = {
    signUpRegistration
}