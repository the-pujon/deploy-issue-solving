import { z } from "zod";

const messageValidation = z.object({
    content: z.string({
        required_error: "Content is required"
    }),
});


export const Validation = {
    messageValidation
}