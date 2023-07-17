"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = exports.booksSchema = void 0;
const mongoose_1 = require("mongoose");
exports.booksSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: String, required: true },
    publicationYear: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    totalSale: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, required: true, default: true },
    rating: { type: Number, required: true, default: 0 },
    allRating: [{ type: Number, required: true, default: 0, select: 0 }],
    quantity: { type: Number, required: true },
    reviews: {
        type: [
            {
                id: { type: Number, required: true },
                reviewerName: { type: String, required: true },
                review: { type: String, required: true },
            },
        ],
        default: [],
    },
    img: { type: String, required: true },
    sellerID: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Books = (0, mongoose_1.model)("Books", exports.booksSchema);
