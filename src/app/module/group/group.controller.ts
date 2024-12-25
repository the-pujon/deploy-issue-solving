import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/SendResponse"
import { groupService } from "./group.sevice"
import { io } from "../../../server"


const groupCreation = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization?.split(" ")[1]

    const { name, type } = req.body
    const { createdBy } = req.params


    const result = await groupService.createGroup(name, createdBy, type, token as string)

    io.emit('group_created', result)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Group created Successfully',
        data: result
    })
})

const joinGroup = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization?.split(" ")[1]

    const { userId,groupId } = req.params

    const result = await groupService.joinGroup(userId,groupId,token as string)

    io.to(groupId).emit('user_joined', { userId, groupId })

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Join Group Successfully',
        data: result
    })
})
const viewGroup = catchAsync(async (req: Request, res: Response) => {
    const { groupId } = req.params

    const result = await groupService.viewGroup(groupId)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Group retrived Successfully',
        data: result
    })
})
const viewAllGroup = catchAsync(async (req: Request, res: Response) => {


    const result = await groupService.viewAllGroups()

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'All groups retrived Successfully',
        data: result
    })
})


export const groupController = {
    groupCreation,
    joinGroup,
    viewGroup,
    viewAllGroup
}