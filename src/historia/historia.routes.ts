import { Router } from "express";
import { HistoriaControler } from "./historia.controler.js";
import { schemaValidator } from "../shared/schemaValidator.js";
import { historiaSchema, historiaUpdateSchema } from "./historia.schema.js";
import { adminOrHistoriaOwnerValidator } from "../shared/adminOrHistoriaOwnerValidator.js";
import { adminOrCreatorValidator } from "../shared/adminOrCreatorValidator.js";

export const historiaRouter = Router();
const historiaControler = new HistoriaControler();  

// CRUD BÁSICO
historiaRouter.get('/', historiaControler.findAll);
historiaRouter.get('/:id', historiaControler.findOne);

// Rutas Protegidas
historiaRouter.get('/:id', adminOrHistoriaOwnerValidator, schemaValidator(historiaSchema), historiaControler.findOne);
historiaRouter.post('/', adminOrCreatorValidator, schemaValidator(historiaSchema), historiaControler.add);
historiaRouter.put('/:id', adminOrHistoriaOwnerValidator, schemaValidator(historiaUpdateSchema), historiaControler.update); 
historiaRouter.delete('/:id', adminOrHistoriaOwnerValidator, historiaControler.delete);
