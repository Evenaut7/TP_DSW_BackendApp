import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config.js";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload & { id?: number; gmail?: string; tipo?: string };
    }
  }
}

export const sessionData: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.access_token;
  const refreshToken = req.cookies?.refresh_token;
  
  if (accessToken) {
    try {
      const data = jwt.verify(accessToken, config.jwt.accessSecret) as JwtPayload;
      req.user = data;
      next();
      return;
    } catch (err: any) {
      if (err.name !== 'TokenExpiredError') {
        res.status(401).json({ message: "Token Invalido" });
        return;
      }
    }
  }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as JwtPayload;

      const newAccessToken = jwt.sign(
        { id: decoded.id, gmail: decoded.gmail, tipo: decoded.tipo },
        config.jwt.accessSecret,
        { expiresIn: '15m' }
      );

      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: config.server.nodeEnv === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
        path: '/',
      });

      req.user = decoded;
      next();
      return;

    } catch (refreshErr: any) {
      res.status(401).json({ message: "Token expirado - Por favor inicia sesión nuevamente" });
      return;
    }
  }

  res.status(401).json({ message: "Token requerido" });
  return;
};