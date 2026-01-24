import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload & { id?: number; gmail?: string; tipo?: string };
    }
  }
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'Un secreto super secreto que nos ayudara a poder implementar autenticacion en nuestro super proyecto! :D (Despues lo introducimos en variables de entorno)';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'Un secreto super secreto para el refresco que nos ayudara a poder implementar autenticacion en nuestro super proyecto! :D (Despues lo introducimos en variables de entorno)';

export const sessionData: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.access_token;
    
    if (!accessToken) {
      res.status(401).json({ message: "Token Requerido" });
      return;
    }

    const data = jwt.verify(accessToken, ACCESS_SECRET) as JwtPayload;
    req.user = data;
    next();
    return;
    
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      try {
        const refreshToken = req.cookies?.refresh_token;

        if (!refreshToken) {
          res.status(401).json({ message: "Token Expirado y no hay Refresh Token" });
          return;
        }

        const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as JwtPayload;

        const newAccessToken = jwt.sign(
          { id: decoded.id, gmail: decoded.gmail, tipo: decoded.tipo },
          ACCESS_SECRET,
          { expiresIn: '15m' }
        );

        res.cookie('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000, // 15 minutos
        });

        req.user = decoded;
        next();
        return;

      } catch (refreshErr: any) {
        res.status(401).json({ message: "Token Expirado y Refresh Token Inválido o Expirado" });
        return;
      }
    }

    res.status(401).json({ message: "Token Invalido o Expirado" });
    return;
  }
};