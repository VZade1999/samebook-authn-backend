import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

export const generateAccessToken = (payload: Record<string, any>) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload: Record<string, any>) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string) => jwt.verify(token, ACCESS_SECRET);

export const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_SECRET);
