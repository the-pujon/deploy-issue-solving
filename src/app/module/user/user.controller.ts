import { Request, Response } from "express"
import sendResponse from "../../utils/SendResponse"
import catchAsync from "../../utils/catchAsync"
import { userService } from "./user.service"
import { io } from "../../../server"


const signUpRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUser(req)
    


    const x = io.emit("signup", { success: true, message: "User registered successfully", data: result });
 

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