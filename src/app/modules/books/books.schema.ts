import { Schema, model } from "mongoose";
import { BooksModel, IBooks } from "./books.interface";

const booksSchema = new Schema<IBooks, BooksModel>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true, default: true },
  rating: { type: Number, required: true, default: 0 },
  allRating: [{ type: Number, required: true, default: 0 }],
  quantity: { type: Number, required: true },
  reviews: {
    type: [
      {
        id: { type: String, required: true },
        reviewerName: { type: String, required: true },
        review: { type: String, required: true },
      },
    ],
    default: [],
  },
  img: { type: String, required: true },
  sellerID: { type: String, required: true },
});

export const Books = model<IBooks, BooksModel>("Books", booksSchema);