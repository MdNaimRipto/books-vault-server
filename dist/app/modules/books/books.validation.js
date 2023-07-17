"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        author: zod_1.z.string({
            required_error: "Author is required",
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required",
        }),
        publicationDate: zod_1.z.string({
            required_error: "Publication Date is required",
        }),
        publicationYear: zod_1.z.string({
            required_error: "Publication Year is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        price: zod_1.z.number().positive("Price must be a positive number"),
        totalSale: zod_1.z.number().int().min(0, "Total Sale is Required"),
        inStock: zod_1.z.boolean({
            required_error: "In Stock must be a boolean",
        }),
        rating: zod_1.z.number().int().min(0, "Rating must be a non-negative integer"),
        allRating: zod_1.z.array(zod_1.z.number({
            required_error: "All Rating required",
        })),
        quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
        reviews: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string({
                required_error: "Review ID is required",
            }),
            reviewerName: zod_1.z.string({
                required_error: "Reviewer Name is required",
            }),
            review: zod_1.z.string({
                required_error: "Review is required",
            }),
        })),
        img: zod_1.z.string({
            required_error: "Image URL is required",
        }),
        sellerID: zod_1.z.string({
            required_error: "Seller ID is required",
        }),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        sellerID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
        updateData: zod_1.z.object({
            title: zod_1.z.string().optional(),
            author: zod_1.z.string().optional(),
            genre: zod_1.z.string().optional(),
            publicationDate: zod_1.z.string().optional(),
            publicationYear: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            price: zod_1.z.number().positive("Price must be a positive number").optional(),
            totalSale: zod_1.z.number().int().min(0, "Total Sale is Required").optional(),
            inStock: zod_1.z.boolean().optional(),
            rating: zod_1.z
                .number()
                .int()
                .min(0, "Rating must be a non-negative integer")
                .optional(),
            allRating: zod_1.z.array(zod_1.z.number().optional()).optional(),
            quantity: zod_1.z
                .number()
                .int()
                .positive("Quantity must be a positive integer")
                .optional(),
            reviews: zod_1.z
                .array(zod_1.z
                .object({
                id: zod_1.z.string().optional(),
                reviewerName: zod_1.z.string().optional(),
                review: zod_1.z.string().optional(),
            })
                .optional())
                .optional(),
            img: zod_1.z.string().optional(),
            sellerID: zod_1.z.string().optional(),
        }),
    }),
});
const deleteBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        sellerID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
    }),
});
const reviewBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
        review: zod_1.z.object({
            reviewerName: zod_1.z.string({
                required_error: "Reviewer Name is Required",
            }),
            review: zod_1.z.string({
                required_error: "Review is Required",
            }),
        }),
    }),
});
const updateRatingBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
        rating: zod_1.z.number({
            required_error: "Rating is Required",
        }),
    }),
});
exports.BooksValidation = {
    createBookZodSchema,
    updateBookZodSchema,
    deleteBookZodSchema,
    reviewBookZodSchema,
    updateRatingBookZodSchema,
};
