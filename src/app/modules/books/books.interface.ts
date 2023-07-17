import { Model } from "mongoose";

export type IBooks = {
  title: string;
  author: string;
  genre: string;
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

export type IReview = {
  reviewerName: string;
  review: string;
};

export type IBooksFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};

export type BooksModel = Model<IBooks, object>;
