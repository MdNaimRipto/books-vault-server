import express from "express";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { BooksValidation } from "./books.validation";
import { BooksController } from "./books.controller";

const router = express.Router();

router.post(
  "/createNewBook",
  zodValidationRequest(BooksValidation.createBookZodSchema),
  BooksController.createNewBook
);

export const BooksRouter = router;
