import { Request, Response, NextFunction } from 'express';
import { Status } from "../utils/types"

export const validateOrderInput = (req: Request, res: Response, next: NextFunction) => {
  const { userId, products } = req.body;
  if (!userId || !products || !Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  next();
};

export const validateOrderStatus = (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  if (!Object.values(Status).includes(status)) {
    return res.status(401).json({ message: 'status value not allowed' });
  }

  next();
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No auth token provided' });
  if (token !== ACCESS_TOKEN) return res.status(401).json({ message: 'Invalid token' });

  next();
};