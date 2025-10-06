import { Router } from "express";
import { UsuarioController } from "./usuario.controler.js";
import { protect } from "../shared/auth.middleware.js";


export const usuarioRouter = Router();
const usuarioController = new UsuarioController();  
// -----------------------------------------
// ➡️ NUEVA RUTA PROTEGIDA: Obtener/Crear Usuario
// Usamos ClerkExpressWithAuth para inyectar req.auth y proteger la ruta.
usuarioRouter.get('/me', protect, usuarioController.lazyUpsert); // ⬅️ NUEVO método
// -----------------------------------------
usuarioRouter.get('/', usuarioController.findAll);
usuarioRouter.get('/:id', usuarioController.findOne);   
usuarioRouter.post('/', usuarioController.add);
usuarioRouter.put('/:id', usuarioController.update);  
usuarioRouter.delete('/:id', usuarioController.delete);