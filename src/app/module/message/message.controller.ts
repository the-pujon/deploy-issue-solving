import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/SendResponse"
import { messageService } from "./message.service"


const sentMessage = catchAsync(async (req: Request, res: Response) => {
    const { groupId, userId } = req.params; 
    const { content } = req.body;
    const result = await messageService.sendMessage(content,groupId,userId)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Message Sent Successfully',
        data: result
    })
})
const viewMessage = catchAsync(async (req: Request, res: Response) => {
    const { groupId } = req.params; 
  
    const result = await messageService.viewMessage(groupId)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Message retrived Successfully',
        data: result
    })
})

export const messageController = {
    sentMessage,
    viewMessage
}