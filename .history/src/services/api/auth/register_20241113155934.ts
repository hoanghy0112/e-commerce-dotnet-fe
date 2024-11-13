import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../../../types/entities/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract and validate the data from the request body
  const { id, name, email, password }: RegisterUserDto = req.body;

  if (!id || !name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Call the function that handles user registration
    const result = await registerUser({ id, name, email, password });

    // Send a success response if registration is successful
    return res.status(200).json({ message: 'User registered successfully', user: result });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while registering the user' });
  }
}

// Mock function to simulate user registration
async function registerUser(user: RegisterUserDto) {
  // Replace this with your database logic
  return Promise.resolve(user); // Simulates a successful registration
}
