import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodObject, ZodError, ZodRawShape } from "zod";

export const schemaValidator =
  (schema: ZodObject<ZodRawShape>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json(
          error.issues.map((issue) => ({
            message: issue.message,
          }))
        );
        return; 
      }
      res.status(500).json({ message: "internal server error" });
    }
  };