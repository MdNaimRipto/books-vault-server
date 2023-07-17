import { Model } from "mongoose";

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};

export type IUserLogin = {
  email: string;
  password: string;
};

export type Status =
  | "wantToRead"
  | "currentlyReading"
  | "planToRead"
  | "finishedReading";

export type IMyBooks = {
  title: string;
  author: string;
  genre: string;
  status: Status;
  publicationDate: string;
  publicationYear: string;
  description: string;
  price: number;
  totalSale: number;
  inStock: boolean;
  rating: number;
  allRating: [number];
  quantity: number;
  reviews: [
    {
      reviewerName: string;
      review: string;
    }
  ];
  img: string;
  sellerID: string;
};

export type UserModel = Model<IUser, object>;

export type MyBooksModel = Model<IMyBooks, object>;
