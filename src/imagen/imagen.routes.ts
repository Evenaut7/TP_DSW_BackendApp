import { Router } from "express";
import { ImagenControler } from "./imagen.controller.js";
import { uploadImages } from "../shared/multer.js";

export const imagenRouter = Router();
const imagenControler = new ImagenControler();  

imagenRouter.post('/', uploadImages.single('imagen') ,imagenControler.add);
imagenRouter.put('/:id', uploadImages.single('imagen'), imagenControler.update); 
imagenRouter.delete('/:id', imagenControler.delete);