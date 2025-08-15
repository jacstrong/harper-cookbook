import { userService } from '../../utils/userService';
import type { INewUserParams } from '../../models/userSchema';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<INewUserParams>(event);

    if (!body) {
      throw createError({ statusCode: 400, message: 'Invalid request body' });
    }

    const user = await userService.createUser(body);

    return {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    };
  }
});
