"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupValidation = void 0;
const zod_1 = require("zod");
const createGroupValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required"
    }),
    type: zod_1.z.string({
        required_error: "Group Type is required"
    }),
});
exports.groupValidation = {
    createGroupValidation
};
