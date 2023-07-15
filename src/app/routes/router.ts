import express from "express";
import { UserRouter } from "../modules/users/users.router";
import { BooksRouter } from "../modules/books/books.router";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/books",
    route: BooksRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;
