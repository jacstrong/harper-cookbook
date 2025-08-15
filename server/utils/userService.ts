import type { INewUserParams } from "../models/userSchema";
import UserSchema from "../models/userSchema";

export const userService = {
  getUser: async (id: string) => {
    // Fetch user data from the database
    console.log(`Fetching user with ID: ${id}`);
  },
  getUserByEmail: async (email: string) => {
    // Fetch user by email from the database
    console.log(`Fetching user with email: ${email}`);
  },
  createUser: async (newUser: INewUserParams) => {
    const { email, name, password, relation } = newUser;

    if (!email || !name || !password) {
      throw new Error("Missing required fields: email, name, or password.");
    }

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const user = new UserSchema({
      email,
      name,
      relation,
      active: false,
      role: "user",
    });

    user.setPassword(password);

    await user.save();

    return user.toAuthJSON();
  },
  updateUser: async (id: string, data: any) => {
    // Update user data in the database
  },
  deleteUser: async (id: string) => {
    // Delete user from the database
  }
}
