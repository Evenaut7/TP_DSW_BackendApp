import { Router } from "express";
import { UsuarioController } from "./usuario.controler.js";
import { schemaValidator } from "../schemaValidator.js";
import { usuarioSchema } from "./usuario.schema.js";
import { sessionData } from "../sessionData.js";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();  
usuarioRouter.get('/', usuarioController.findAll);
usuarioRouter.get('/:id', usuarioController.findOne);   
usuarioRouter.post('/register', schemaValidator(usuarioSchema), usuarioController.add);
usuarioRouter.post('/login', usuarioController.login);
usuarioRouter.put('/:id', schemaValidator(usuarioSchema), usuarioController.update);  
usuarioRouter.delete('/:id', usuarioController.delete);
usuarioRouter.post('/logout', usuarioController.logout);