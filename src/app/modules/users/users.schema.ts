import { Schema, model } from "mongoose";
import { IMyBooks, IUser, MyBooksModel, UserModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";
import { bookStatus } from "./users.constant";

const usersSchema = new Schema<IUser, UserModel>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

usersSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

usersSchema.pre("save", async function name(next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

const myBooksSchema = new Schema<IMyBooks, MyBooksModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    status: { type: String, required: true, enum: bookStatus },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Users = model<IUser, UserModel>("Users", usersSchema);

export const MyBooks = model<IMyBooks, MyBooksModel>("MyBooks", myBooksSchema);
