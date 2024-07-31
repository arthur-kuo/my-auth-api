import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import { generateToken, generateRefreshToken } from '../utils/tokenUtils';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, avatar } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({ username, password: hashedPassword, avatar, isActive: true });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(204).send();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(204).send();

    const token = generateToken((user._id as unknown as string).toString());
    const refreshToken = generateRefreshToken((user._id as unknown as string).toString());

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const validateRefreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
    const token = generateToken(decoded.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const getDummyData = (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: 'This is some dummy data' });
  } catch (error) {
    res.status(202).json({ message: 'Token expired' });
  }
};
