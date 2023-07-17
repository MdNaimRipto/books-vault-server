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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const books_schema_1 = require("./books.schema");
const users_schema_1 = require("../users/users.schema");
const books_constant_1 = require("./books.constant");
// Create Book Function:
const createNewBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield books_schema_1.Books.create(bookData);
    console.log(newBook);
    return newBook;
});
// Get All Books Function:
const getAllBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    // Initialize andConditions as an empty array with a type annotation
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_constant_1.booksSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = (yield books_schema_1.Books.find(checkAndCondition)).reverse();
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Books Found");
    }
    return result;
});
const getTopBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_schema_1.Books.find().sort({ totalSale: -1 }).limit(10);
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Books Found");
    }
    return result;
});
// Get Books By ID Function:
const getBooksByID = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_schema_1.Books.findById({ _id: payload });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found");
    }
    return result;
});
// Get Books By Seller Function:
const getBooksBySeller = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_schema_1.Books.find({ sellerID: payload });
    if (!result.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book's Not Found");
    }
    return result;
});
// Update Book Function:
const updateBook = (id, seller, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield books_schema_1.Books.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const checkSeller = yield users_schema_1.Users.findById({ _id: seller });
    if ((checkSeller === null || checkSeller === void 0 ? void 0 : checkSeller.id) !== isExists.sellerID) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! This User Doesn't Have Permission to Update This Book.");
    }
    const { rating, allRating, reviews, totalSale } = payload, updatedPayload = __rest(payload, ["rating", "allRating", "reviews", "totalSale"]);
    if (rating !== undefined ||
        allRating !== undefined ||
        totalSale !== undefined ||
        reviews !== undefined) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Sellers are not allowed to update rating, allRating, and reviews.");
    }
    const result = yield books_schema_1.Books.findOneAndUpdate({ _id: id }, updatedPayload, {
        new: true,
    });
    return result;
});
// Delete Book Function:
const deleteBook = (bookID, sellerID) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield books_schema_1.Books.findById({ _id: bookID });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const checkSeller = yield users_schema_1.Users.findById({ _id: sellerID });
    if ((checkSeller === null || checkSeller === void 0 ? void 0 : checkSeller.id) !== isExists.sellerID) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! This User Doesn't Have Permission to Delete This Book.");
    }
    const result = yield books_schema_1.Books.findOneAndDelete({ _id: bookID });
    return result;
});
// Add Review Function:
const addReview = (id, useID, review) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield users_schema_1.Users.findById({ _id: useID });
    if (!checkUser) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! User Does Not Exists.");
    }
    const isExists = yield books_schema_1.Books.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    if (checkUser.id === isExists.sellerID) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Seller Does Not Have Permission to Add Reviews");
    }
    const { reviews } = isExists;
    if (reviews) {
        reviews.push(review);
    }
    const result = yield books_schema_1.Books.findOneAndUpdate({ _id: id }, isExists, {
        new: true,
    });
    return result;
});
// Update Rating Function:
const updateRating = (id, useID, newRating) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield books_schema_1.Books.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const checkUser = yield users_schema_1.Users.findById({ _id: useID });
    if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.id) === isExists.sellerID) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Seller Does Not Have Permission to Add Ratings");
    }
    const { allRating } = isExists;
    if (allRating) {
        allRating.push(newRating);
        const totalRating = allRating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const ratingCount = allRating.length - 1;
        const avgRating = totalRating / ratingCount;
        isExists.rating = avgRating >= 5 ? 5 : parseFloat(avgRating.toFixed(1));
    }
    const result = yield books_schema_1.Books.findOneAndUpdate({ _id: id }, isExists, {
        new: true,
    });
    return result;
});
exports.BooksService = {
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
