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

export const UserRouter = router;
