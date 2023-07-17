"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const users_validation_1 = require("./users.validation");
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post("/createUser", (0, zodValidationRequest_1.default)(users_validation_1.UserValidation.createUserZodSchema), users_controller_1.UserController.createUser);
router.post("/userLogin", (0, zodValidationRequest_1.default)(users_validation_1.UserValidation.loginZodSchema), users_controller_1.UserController.userLogin);
exports.UserRouter = router;
