import { Router } from "express";
import { HistoriaControler } from "./historia.controler.js";
import { uploadHistoriaImage } from '../multer.js'; 

export const historiaRouter = Router();
const historiaControler = new HistoriaControler();  

historiaRouter.get('/', historiaControler.findAll);
historiaRouter.get('/:id', historiaControler.findOne);    
historiaRouter.post('/', uploadHistoriaImage.single('imagen'), historiaControler.add);
historiaRouter.put('/:id', historiaControler.update); 
historiaRouter.delete('/:id', historiaControler.delete);

