import { Router } from 'express';
import { UsuarioController } from './usuario.controler.js';
import { schemaValidator } from '../shared/schemaValidator.js';
import { usuarioSchema } from './usuario.schema.js';
import { sessionData } from '../shared/sessionData.js';

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

//GESTION DE USUARIOS
usuarioRouter.post('/register', schemaValidator(usuarioSchema), usuarioController.register);
usuarioRouter.post('/login', usuarioController.login);
usuarioRouter.post('/logout', usuarioController.logout);
usuarioRouter.get('/is-admin', sessionData, usuarioController.isAdmin);
usuarioRouter.get('/currentUser', sessionData, usuarioController.getCurrentUser);
usuarioRouter.post('/refresh-token', usuarioController.refreshToken); // En desuso, se maneja automatico con cookies en sessionData.

//CRUD BÁSICO
usuarioRouter.get('/', usuarioController.findAll);
usuarioRouter.get('/:id', usuarioController.findOne);
usuarioRouter.delete('/:id', usuarioController.delete);
usuarioRouter.put('/:id', usuarioController.update);
