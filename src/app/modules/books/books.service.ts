import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBooks, IReview } from "./books.interface";
import { Books } from "./books.schema";
import { Users } from "../users/users.schema";

// Create Book Function:
const createNewBook = async (bookData: IBooks): Promise<IBooks> => {
  const newBook = await Books.create(bookData);
  return newBook;
};

// Get All Books Function:
const getAllBooks = async (): Promise<IBooks[]> => {
  const result = await Books.find();
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Books Found");
  }
  return result;
};

// Get Books By ID Function:
const getBooksByID = async (payload: string): Promise<IBooks | null> => {
  const result = await Books.findById({ _id: payload });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found");
  }
  return result;
};

// Get Books By Seller Function:
const getBooksBySeller = async (payload: string): Promise<IBooks[]> => {
  const result = await Books.find({ sellerID: payload });
  if (!result.length) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book's Not Found");
  }
  return result;
};

// Update Book Function:
const updateBook = async (
  id: string,
  seller: string,
  payload: Partial<IBooks>
): Promise<IBooks | null> => {
  const isExists = await Books.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const checkSeller = await Users.findById({ _id: seller });
  if (checkSeller?.id !== isExists.sellerID) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! This User Doesn't Have Permission to Update This Book."
    );
  }

  const { rating, allRating, reviews, ...updatedPayload } = payload;

  if (
    rating !== undefined ||
    allRating !== undefined ||
    reviews !== undefined
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Sellers are not allowed to update rating, allRating, and reviews."
    );
  }

  const result = await Books.findOneAndUpdate({ _id: id }, updatedPayload, {
    new: true,
  });

  return result;
};

// Delete Book Function:
const deleteBook = async (
  bookID: string,
  sellerID: string
): Promise<IBooks | null> => {
  const isExists = await Books.findById({ _id: bookID });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const checkSeller = await Users.findById({ _id: sellerID });
  if (checkSeller?.id !== isExists.sellerID) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! This User Doesn't Have Permission to Delete This Book."
    );
  }

  const result = await Books.findOneAndDelete({ _id: bookID });
  return result;
};

// Add Review Function:
const addReview = async (
  id: string,
  useID: string,
  review: IReview
): Promise<IBooks | null> => {
  const checkUser = await Users.findById({ _id: useID });
  if (!checkUser) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! User Does Not Exists."
    );
  }

  const isExists = await Books.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }
  if (checkUser.id === isExists.sellerID) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Seller Does Not Have Permission to Add Reviews"
    );
  }

  const { reviews } = isExists;
  if (reviews) {
    reviews.push(review);
  }

  const result = await Books.findOneAndUpdate({ _id: id }, isExists, {
    new: true,
  });

  return result;
};

const updateRating = async (
  id: string,
  useID: string,
  newRating: number
): Promise<IBooks | null> => {
  const isExists = await Books.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const checkUser = await Users.findById({ _id: useID });
  if (checkUser?.id === isExists.sellerID) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Seller Does Not Have Permission to Add Ratings"
    );
  }

  const { allRating } = isExists;

  if (allRating) {
    allRating.push(newRating);
    const totalRating = allRating.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const ratingCount = allRating.length - 1;
    const avgRating = totalRating / ratingCount;
    isExists.rating = avgRating >= 5 ? 5 : parseFloat(avgRating.toFixed(1));
  }
  const result = await Books.findOneAndUpdate({ _id: id }, isExists, {
    new: true,
  });
  return result;
};

export const BooksService = {
  createNewBook,
  getAllBooks,
  getBooksByID,
  getBooksBySeller,
  updateBook,
  deleteBook,
  addReview,
  updateRating,
};
