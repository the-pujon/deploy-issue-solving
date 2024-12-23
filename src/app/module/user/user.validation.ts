import { z } from "zod";

const createUserValidation = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }),

});


export const userValidation = {
    createUserValidation
}