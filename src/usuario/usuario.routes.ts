import { Router } from 'express';
import { UsuarioController } from './usuario.controler.js';
import { schemaValidator } from '../shared/schemaValidator.js';
import { usuarioSchema, usuarioUpdateSchema } from './usuario.schema.js';
import { sessionData } from '../shared/sessionData.js';

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

//GESTION DE USUARIOS
usuarioRouter.post('/register', schemaValidator(usuarioSchema), usuarioController.register);
usuarioRouter.post('/login', usuarioController.login);
usuarioRouter.post('/logout', usuarioController.logout);
usuarioRouter.get('/is-admin', sessionData, usuarioController.isAdmin);
usuarioRouter.get('/is-creator', sessionData, usuarioController.isCreator);
usuarioRouter.get('/is-pdiOwner/:pdi', sessionData, usuarioController.isPdiOwner);
usuarioRouter.get('/currentUser', sessionData, usuarioController.getCurrentUser); // Esto nose si es correcto tenerlo en terminos de seguridad
usuarioRouter.post('/refresh-token', usuarioController.refreshToken); 

//CRUD BÁSICO
usuarioRouter.get('/', usuarioController.findAll);
usuarioRouter.get('/:id', usuarioController.findOne);
usuarioRouter.delete('/:id', usuarioController.delete);
usuarioRouter.put('/:id', schemaValidator(usuarioUpdateSchema), usuarioController.update);
