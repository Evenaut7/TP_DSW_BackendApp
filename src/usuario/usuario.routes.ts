import { Router } from "express";
import { UsuarioController } from "./usuario.controler.js";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();  
usuarioRouter.get('/', usuarioController.findAll);
usuarioRouter.get('/:id', usuarioController.findOne);   
usuarioRouter.post('/register', usuarioController.add);
usuarioRouter.post('/login', usuarioController.login); // ruta protegida de ejemplo
usuarioRouter.put('/:id', usuarioController.update);  
usuarioRouter.delete('/:id', usuarioController.delete);
