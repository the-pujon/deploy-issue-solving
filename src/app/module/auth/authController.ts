import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./Auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: result
    })
})

export const authController = {
    loginUser
}