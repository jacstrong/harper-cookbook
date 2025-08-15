import mongoose, { type Document } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export interface INewUserParams {
  email: string;
  name: string;
  password: string;
  relation: string;
}

export interface IUserDocument extends Document {
  email: string;
  name: string;
  active: boolean;
  hash: string;
  lastLogin: Date;
  salt: string;
  role: 'user' | 'admin' | 'superadmin';
  relation?: string;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJWT(): string;
  toAuthJSON(): {
    id: string;
    email: string;
    token: string;
  };
}

const UserSchema = new mongoose.Schema<IUserDocument>({
  active: { type: Boolean, required: true, default: false},
  email: { type: String, required: [true, 'You must provide an email.'], unique: true },
  hash: { type: String, required: true },
  lastLogin: { type: Date, required: true, default: new Date() },
  name: { type: String, required: true },
  relation: { type: String },
  salt: { type: String, required: true },
  role: { type: String, required: true, default: 'user', enum: ['user', 'admin', 'superadmin']}
})

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function () {

  this.lastLogin = new Date();

  return jwt.sign({
    email: this.email,
    name: this.name,
    id: this._id,
    role: this.role
  }, process.env.NODE_ENV === 'development' ? 'secret' : (process.env.SECRET || 'defaultSecret'), { expiresIn: '3d' });
}

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
}

export default mongoose.model<IUserDocument>('UserSchema', UserSchema);
