import { NextFunction, Request, Response } from 'express';

export const adminValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || req.user.tipo !== 'admin') {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error in the authorization', error: error.message });
    return;
  }
  next();
};
