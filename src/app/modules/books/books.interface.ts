import { Model } from "mongoose";

export type IBooks = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  description: string;
  price: number;
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

export type IReview = {
  reviewerName: string;
  review: string;
};

export type BooksModel = Model<IBooks, object>;
