"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_schema_1 = require("./users.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.Users.create(userData);
    return user;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const matchedUser = yield users_schema_1.Users.findOne({ email: email }, {
        _id: 1,
        password: 1,
    }).lean();
    if (!matchedUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email or Password!");
    }
    const checkPassword = yield bcrypt_1.default.compare(password, matchedUser.password);
    if (!checkPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email or Password!");
    }
    if (matchedUser && checkPassword) {
        const result = yield users_schema_1.Users.findById(matchedUser._id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid Email or Password!");
        }
        return result;
    }
    return null;
});
exports.UserService = {
    createUser,
    userLogin,
};
