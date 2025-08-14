import { Router } from "express";
import { HistoriaControler } from "./historia.controler.js";
import { uploadImages } from '../multer.js'; 

export const historiaRouter = Router();
const historiaControler = new HistoriaControler();  

historiaRouter.get('/', historiaControler.findAll);
historiaRouter.get('/:id', historiaControler.findOne);    
historiaRouter.post('/', uploadImages.single('imagen'), historiaControler.add);
historiaRouter.put('/:id', uploadImages.single('imagen'), historiaControler.update); 
historiaRouter.delete('/:id', historiaControler.delete);

