import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./users.interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";

const usersSchema = new Schema<IUser, UserModel>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
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

export const Users = model<IUser, UserModel>("Users", usersSchema);
