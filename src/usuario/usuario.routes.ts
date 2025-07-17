import { Router } from "express";
import { UsuarioController } from "./usuario.controler.js";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();  
usuarioRouter.get('/', usuarioController.findAll);
usuarioRouter.get('/:id', usuarioController.findOne);   
usuarioRouter.post('/', usuarioController.add);
usuarioRouter.put('/:id', usuarioController.update);  
usuarioRouter.delete('/:id', usuarioController.delete);
