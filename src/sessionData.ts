import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload & { id?: number; email?: string};
    }
  }
}

export const sessionData: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) res.status(401).json({ error: "Token requerido" })

  try {
    const data = jwt.verify(token,'Un secreto super secreto que nos ayudara a poder implementar autenticacion en nuestro super proyecto! :D (Despues lo introducimos en variables de entorno)') as JwtPayload;
    req.user = data; 
  } catch {
    res.status(403).json({ error: "Token inválido" });
  }
  next()
}