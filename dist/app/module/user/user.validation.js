"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required"
    }),
    password: zod_1.z.string({
        required_error: "Password is required"
    }),
    email: zod_1.z.string({
        required_error: "Email is required"
    }),
});
exports.userValidation = {
    createUserValidation
};
