import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  isActive: boolean;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  avatar: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);
export default User;
