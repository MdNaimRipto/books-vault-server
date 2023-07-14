import { IUser } from "./users.interface";
import { Users } from "./users.schema";

const createUser = async (userData: IUser): Promise<IUser> => {
  const user = await Users.create(userData);
  return user;
};

export const UserService = {
  createUser,
};
