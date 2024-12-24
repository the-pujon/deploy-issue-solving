import { z } from "zod";

const createGroupValidation = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    type: z.string({
        required_error: "Group Type is required"
    }),
    createdBy: z.string({
        required_error: "createdBy is required"
    }),

});


export const groupValidation = {
    createGroupValidation
}