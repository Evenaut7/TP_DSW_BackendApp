import { ValoracionController } from "./valoracion.controler.js";
import { Router } from "express";   

export const valoracionRouter = Router();
const valoracionController = new ValoracionController();  

valoracionRouter.get('/', valoracionController.findAll);
valoracionRouter.get('/:id', valoracionController.findOne); 
valoracionRouter.post('/', valoracionController.add);
valoracionRouter.put('/:id', valoracionController.update);
valoracionRouter.delete('/:id', valoracionController.delete);

