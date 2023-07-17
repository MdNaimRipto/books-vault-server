import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BooksService } from "./books.service";
import { IBooks } from "./books.interface";
import pick from "../../../shared/shared";
import { filterableFields } from "./books.constant";

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
  const filters = pick(req.query, filterableFields);
  const result = await BooksService.getAllBooks(filters);
  sendResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

const getTopBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getTopBooks();
  sendResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

const getBooksByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BooksService.getBooksByID(id);
  sendResponse<IBooks | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

const getBooksBySeller = catchAsync(async (req: Request, res: Response) => {
  const { sellerID } = req.params;
  const result = await BooksService.getBooksBySeller(sellerID);
  sendResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sellerID, updateData } = req.body;
  console.log(sellerID, updateData);
  const result = await BooksService.updateBook(id, sellerID, updateData);
  sendResponse<IBooks | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Updated Successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sellerID } = req.body;
  const result = await BooksService.deleteBook(id, sellerID);
  sendResponse<IBooks | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Deleted Successfully",
    data: result,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID, review } = req.body;
  const result = await BooksService.addReview(id, userID, review);
  sendResponse<IBooks | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: result,
  });
});

const updateRating = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID, rating } = req.body;
  const result = await BooksService.updateRating(id, userID, rating);
  sendResponse<IBooks | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: result,
  });
});

export const BooksController = {
  createNewBook,
  getAllBooks,
  getTopBooks,
  getBooksByID,
  getBooksBySeller,
  updateBook,
  deleteBook,
  addReview,
  updateRating,
};
