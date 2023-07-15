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

const updateBookZodSchema = z.object({
  body: z.object({
    sellerID: z.string({
      required_error: "Seller ID is Required",
    }),
    updateData: z.object({
      title: z.string().optional(),
      author: z.string().optional(),
      genre: z.string().optional(),
      publicationDate: z.string().optional(),
      description: z.string().optional(),
      price: z.number().positive("Price must be a positive number").optional(),
      inStock: z.boolean().optional(),
      rating: z
        .number()
        .int()
        .min(0, "Rating must be a non-negative integer")
        .optional(),
      allRating: z.array(z.number().optional()).optional(),
      quantity: z
        .number()
        .int()
        .positive("Quantity must be a positive integer")
        .optional(),
      reviews: z
        .array(
          z
            .object({
              id: z.string().optional(),
              reviewerName: z.string().optional(),
              review: z.string().optional(),
            })
            .optional()
        )
        .optional(),
      img: z.string().optional(),
      sellerID: z.string().optional(),
    }),
  }),
});

const deleteBookZodSchema = z.object({
  body: z.object({
    sellerID: z.string({
      required_error: "Seller ID is Required",
    }),
  }),
});

const reviewBookZodSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "Seller ID is Required",
    }),
    review: z.object({
      reviewerName: z.string({
        required_error: "Reviewer Name is Required",
      }),
      review: z.string({
        required_error: "Review is Required",
      }),
    }),
  }),
});

export const BooksValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  deleteBookZodSchema,
  reviewBookZodSchema,
};
