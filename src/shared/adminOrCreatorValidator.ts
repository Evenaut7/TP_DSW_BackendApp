import { NextFunction, Request, Response } from 'express';

export const adminOrCreatorValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || (req.user.tipo !== 'creador' && req.user.tipo !== 'admin')) {
      res.status(403).json({ message: 'Unauthorized' });
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