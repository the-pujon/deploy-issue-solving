import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/SendResponse"
import { groupService } from "./group.sevice"


const groupCreation = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization?.split(" ")[1]

    const { name, type } = req.body
    const { createdBy } = req.params


    const result = await groupService.createGroup(name, createdBy, type, token as string)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Group created Successfully',
        data: result
    })
})


export const groupController = {
    groupCreation
}