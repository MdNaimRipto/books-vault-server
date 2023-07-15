import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BooksService } from "./books.service";

const createNewBook = catchAsync(async (req: Request, res: Response) => {
  const { ...booksData } = req.body;
  const result = await BooksService.createNewBook(booksData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New Book Created Successfully",
    data: result,
  });
});

export const BooksController = {
  createNewBook,
};
