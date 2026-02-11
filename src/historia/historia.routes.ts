import { Router } from "express";
import { HistoriaControler } from "./historia.controller.js";
import { schemaValidator } from "../shared/middleware/schemaValidator.js";
import { historiaSchema, historiaUpdateSchema } from "./historia.schema.js";
import { adminOrHistoriaOwnerValidator } from "../shared/middleware/adminOrHistoriaOwnerValidator.js";
import { adminOrCreatorValidator } from "../shared/middleware/adminOrCreatorValidator.js";
import { sessionData } from "../shared/middleware/sessionData.js";

export const historiaRouter = Router();
const historiaControler = new HistoriaControler();  

// CRUD BÁSICO
historiaRouter.get('/', historiaControler.findAll);
historiaRouter.get('/:id', historiaControler.findOne);

// Rutas Protegidas
historiaRouter.get('/:id', sessionData, adminOrHistoriaOwnerValidator, schemaValidator(historiaSchema), historiaControler.findOne);
historiaRouter.post('/', sessionData, adminOrCreatorValidator, schemaValidator(historiaSchema), historiaControler.add);
historiaRouter.get('/canEdit/:id', sessionData, adminOrHistoriaOwnerValidator, historiaControler.findOne)
historiaRouter.put('/:id', sessionData, adminOrHistoriaOwnerValidator, schemaValidator(historiaUpdateSchema), historiaControler.update); 
historiaRouter.delete('/:id', sessionData, adminOrHistoriaOwnerValidator, historiaControler.delete);
