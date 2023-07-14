/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
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

export type UserModel = Model<IUser, object>;
