import { Router } from "express";
import { HistoriaControler } from "./historia.controler.js";
import { uploadImages } from '../shared/multer.js'; 
import { schemaValidator } from "../shared/schemaValidator.js";
import { historiaSchema } from "./historia.schema.js";

export const historiaRouter = Router();
const historiaControler = new HistoriaControler();  

historiaRouter.get('/', historiaControler.findAll);
historiaRouter.get('/:id', historiaControler.findOne);    
historiaRouter.post('/', schemaValidator(historiaSchema), historiaControler.add);
historiaRouter.put('/:id', historiaControler.update); 
historiaRouter.delete('/:id', historiaControler.delete);

// Agregar el Schema Valdiator
