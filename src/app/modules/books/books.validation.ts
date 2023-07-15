import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publicationDate: z.string({
      required_error: "Publication Date is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    price: z.number().positive("Price must be a positive number"),
    inStock: z.boolean({
      required_error: "In Stock must be a boolean",
    }),
    rating: z.number().int().min(0, "Rating must be a non-negative integer"),
    allRating: z.array(
      z.number({
        required_error: "All Rating required",
      })
    ),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    reviews: z.array(
      z.object({
        id: z.string({
          required_error: "Review ID is required",
        }),
        reviewerName: z.string({
          required_error: "Reviewer Name is required",
        }),
        review: z.string({
          required_error: "Review is required",
        }),
      })
    ),
    img: z.string({
      required_error: "Image URL is required",
    }),
    sellerID: z.string({
      required_error: "Seller ID is required",
    }),
  }),
});

export const BooksValidation = {
  createBookZodSchema,
};
