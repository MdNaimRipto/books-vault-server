"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is Required",
            }),
        }),
        email: zod_1.z.string({
            required_error: "Email is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    loginZodSchema,
};
