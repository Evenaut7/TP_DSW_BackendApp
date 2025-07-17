import { Router } from "express";
import { LocalidadController } from "./localidad.controller.js";

export const localidadRouter = Router();
export const localidadController = new LocalidadController();

localidadRouter.get('/', localidadController.findAll);
localidadRouter.get('/:id', localidadController.findOne);
localidadRouter.post('/', localidadController.add);
localidadRouter.put('/:id', localidadController.update);
localidadRouter.delete('/:id', localidadController.delete);