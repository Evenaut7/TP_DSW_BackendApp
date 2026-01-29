import { ValoracionController } from "./valoracion.controler.js";
import { Router } from "express";   
import { sessionData } from "../shared/sessionData.js";
import { adminOrValorationOwnerValidator } from "../shared/adminOrValorationOwnerValidator.js";
import { schemaValidator } from "../shared/schemaValidator.js";
import { valoracionSchema, valoracionUpdateSchema } from "./valoracion.schema.js";

export const valoracionRouter = Router();
const valoracionController = new ValoracionController();  

valoracionRouter.get('/', valoracionController.findAll);
valoracionRouter.get('/:id', valoracionController.findOne);

valoracionRouter.post('/', sessionData, schemaValidator(valoracionSchema), valoracionController.add);

valoracionRouter.put('/:id', sessionData, adminOrValorationOwnerValidator, schemaValidator(valoracionUpdateSchema), valoracionController.update);
valoracionRouter.delete('/:id', sessionData, adminOrValorationOwnerValidator, valoracionController.delete);

