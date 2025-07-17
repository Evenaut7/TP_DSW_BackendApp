import { Router } from "express";
import { HistoriaControler } from "./historia.controler.js";

export const historiaRouter = Router();
const historiaControler = new HistoriaControler();  

historiaRouter.get('/', historiaControler.findAll);
historiaRouter.get('/:id', historiaControler.findOne);    
historiaRouter.post('/', historiaControler.add);
historiaRouter.put('/:id', historiaControler.update); 
historiaRouter.delete('/:id', historiaControler.delete);

