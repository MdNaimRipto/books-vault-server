import { Model } from "mongoose";

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};

export type UserModel = Model<IUser, object>;
