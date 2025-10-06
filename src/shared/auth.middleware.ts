import { NextFunction, Request, Response } from "express";
import { getAuth } from '@clerk/express'

// Middleware de protección: no debe retornar un Response (solo llamar next() o enviar respuesta
// y terminar). Declaramos retorno void para cumplir con la firma de RequestHandler.
export const protect = (req: Request, res: Response, next: NextFunction): void => {
    const { isAuthenticated, userId } = getAuth(req);
    if (isAuthenticated && userId) {
        next();
        return; // aseguramos que la función retorna void después de next()
    }

    // En caso no autenticado, enviamos la respuesta, pero no la retornamos como valor desde la función.
    res.status(401).json({ message: 'Acceso no autorizado. Se requiere token de sesión (JWT) válido.' });
}