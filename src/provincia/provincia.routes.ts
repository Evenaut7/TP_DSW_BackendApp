import { Router } from "express";
import { ProvinciaController } from "./provincia.controller.js";

export const provinciaRouter = Router()
const provinciaController = new ProvinciaController();
provinciaRouter.get('/', provinciaController.findAll);
provinciaRouter.get('/:id', provinciaController.findOne);
provinciaRouter.post('/', provinciaController.add);
provinciaRouter.put('/:id', provinciaController.update);
provinciaRouter.delete('/:id', provinciaController.delete);
