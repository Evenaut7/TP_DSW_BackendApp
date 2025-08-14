import { Router } from "express";
import { LocalidadController } from "./localidad.controller.js";
import { uploadImages } from '../multer.js'; 

export const localidadRouter = Router();
export const localidadController = new LocalidadController();

localidadRouter.get('/', localidadController.findAll);
localidadRouter.get('/:id', localidadController.findOne);
localidadRouter.post('/',  uploadImages.single('imagen'),localidadController.add);
localidadRouter.put('/:id',  uploadImages.single('imagen'),localidadController.update);
localidadRouter.delete('/:id', localidadController.delete);