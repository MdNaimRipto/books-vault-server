import express from "express";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { UserValidation } from "./users.validation";
import { UserController } from "./users.controller";

const router = express.Router();

router.post(
  "/createUser",
  zodValidationRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/userLogin",
  zodValidationRequest(UserValidation.loginZodSchema),
  UserController.userLogin
);

export const UserRouter = router;
