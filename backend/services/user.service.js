import userModel from "../model/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password should be provided");
  }
  const hashedPassword = await userModel.hashedPassword(password);
  const user = await userModel.create({
    email: email,
    password: hashedPassword,
  });
  return user;
};
