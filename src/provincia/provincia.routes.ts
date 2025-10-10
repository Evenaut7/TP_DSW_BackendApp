import { Router } from "express";
import { ProvinciaController } from "./provincia.controller.js";
import { schemaValidator } from "../shared/schemaValidator.js";
import { provinciaSchema } from "./provincia.schema.js";

export const provinciaRouter = Router()
const provinciaController = new ProvinciaController();
provinciaRouter.get('/', provinciaController.findAll);
provinciaRouter.get('/:id', provinciaController.findOne);
provinciaRouter.post('/', schemaValidator(provinciaSchema), provinciaController.add);
provinciaRouter.put('/:id', provinciaController.update);
provinciaRouter.delete('/:id', provinciaController.delete);
