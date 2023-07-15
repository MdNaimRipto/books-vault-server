import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BooksService } from "./books.service";
import { IBooks } from "./books.interface";

const createNewBook = catchAsync(async (req: Request, res: Response) => {
  const { ...booksData } = req.body;
  const result = await BooksService.createNewBook(booksData);
  sendResponse<IBooks>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New Book Created Successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getAllBooks();
  sendResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

export const BooksController = {
  createNewBook,
  getAllBooks,
};