import { ValoracionController } from "./valoracion.controler.js";
import { Router } from "express";   
import { sessionData } from "../shared/sessionData.js";
import { adminOrValorationOwnerValidator } from "../shared/adminOrValorationOwnerValidator.js";

export const valoracionRouter = Router();
const valoracionController = new ValoracionController();  

valoracionRouter.get('/', valoracionController.findAll);
valoracionRouter.get('/:id', valoracionController.findOne);

valoracionRouter.post('/', sessionData, valoracionController.add);

valoracionRouter.put('/:id', sessionData, adminOrValorationOwnerValidator, valoracionController.update);
valoracionRouter.delete('/:id', sessionData, adminOrValorationOwnerValidator, valoracionController.delete);

