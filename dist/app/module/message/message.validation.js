"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const zod_1 = require("zod");
const messageValidation = zod_1.z.object({
    content: zod_1.z.string({
        required_error: "Content is required"
    }),
});
exports.Validation = {
    messageValidation
};
