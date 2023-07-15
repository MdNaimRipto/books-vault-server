import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser, IUserLogin } from "./users.interface";
import { Users } from "./users.schema";
import bcrypt from "bcrypt";

const createUser = async (userData: IUser): Promise<IUser> => {
  const user = await Users.create(userData);
  return user;
};

const userLogin = async (payload: IUserLogin): Promise<IUser | null> => {
  const { email, password } = payload;
  const matchedUser = await Users.findOne(
    { email: email },
    {
      _id: 1,
      password: 1,
    }
  ).lean();
  if (!matchedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password!");
  }

  const checkPassword = await bcrypt.compare(password, matchedUser.password);
  if (!checkPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password!");
  }

  if (matchedUser && checkPassword) {
    const result = await Users.findById(matchedUser._id);
    if (!result) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Email or Password!");
    }

    return result;
  }
  return null;
};

export const UserService = {
  createUser,
  userLogin,
};
