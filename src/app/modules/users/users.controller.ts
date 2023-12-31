import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./users.service";
import { IUser } from "./users.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...authenticationInfo } = req.body;
  const result = await UserService.userLogin(authenticationInfo);
  sendResponse<IUser | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged in Successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  userLogin,
};
