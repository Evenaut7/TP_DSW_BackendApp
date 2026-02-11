import { Router } from 'express'
import { PuntoDeInteresController } from './puntoDeInteres.controller.js'
import { puntoDeInteresSchema, puntoDeInteresUpdateSchema } from './puntoDeInteres.schema.js';
import { schemaValidator } from "../shared/middleware/schemaValidator.js";
import { sessionData } from '../shared/middleware/sessionData.js';
import { creatorValidator } from '../shared/middleware/creatorValidator.js';
import { adminOrCreatorValidator } from '../shared/middleware/adminOrCreatorValidator.js';
import { adminOrPdiOwnerValidator } from '../shared/middleware/adminOrPdiOwnerValidator.js';

export const puntoDeInteresRouter = Router()
const puntoDeInteresController = new PuntoDeInteresController()

//ENDPOINTS EXTRA

// Recibe una Localidad, una busqueda (string) y una lista de Tags (number[]) y retorna los PuntosDeInteres que cumplan con esos filtros
puntoDeInteresRouter.post('/filtro', puntoDeInteresController.filtro)

// Retorna todos los PuntosDeInteres creados por el usuario que está logeado
puntoDeInteresRouter.get('/usuarioPdis', sessionData, creatorValidator, puntoDeInteresController.getAllFromUsuarioLogeado) 

// Retorna todos los PuntosDeInteres marcados como favoritos por el usuario logeado
puntoDeInteresRouter.get('/favoritos', sessionData, puntoDeInteresController.getFavoritos)

// Toma un  pdi y lo agrega a favoritos
puntoDeInteresRouter.post('/favorito', sessionData, puntoDeInteresController.addToFavoritos)
// Toma un pdi y lo saca de favoritos
puntoDeInteresRouter.delete('/favorito', sessionData, puntoDeInteresController.sacarDeFavoritos)
// Chequea si un pdi es favorito del usuario logeado
puntoDeInteresRouter.get('/favorito/:id', sessionData, puntoDeInteresController.esFavorito)

//CRUD BÁSICO
puntoDeInteresRouter.get('/', puntoDeInteresController.findAll)
puntoDeInteresRouter.get('/:id', puntoDeInteresController.findOne)
// Rutas Protegidas - Admin o Creador
puntoDeInteresRouter.post('/', sessionData, adminOrCreatorValidator, schemaValidator(puntoDeInteresSchema), puntoDeInteresController.add)
// Rutas Protegidas - Solo Admin o Dueño del PDI (Validado en Controlador)
puntoDeInteresRouter.get('/canEdit/:id', sessionData, adminOrPdiOwnerValidator, puntoDeInteresController.findOne) 
puntoDeInteresRouter.put('/:id', sessionData, adminOrPdiOwnerValidator, schemaValidator(puntoDeInteresUpdateSchema), puntoDeInteresController.update)
puntoDeInteresRouter.delete('/:id', sessionData, adminOrPdiOwnerValidator, puntoDeInteresController.remove)



