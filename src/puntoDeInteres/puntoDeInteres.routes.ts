import { Router } from 'express'
import { findAll, findOne, add, update, remove, filtro, getAllFromUsuarioLogeado, addToFavoritos, sacarDeFavoritos, esFavorito, getFavoritos } from './puntoDeInteres.controler.js'
import { puntoDeInteresSchema } from './puntoDeInteres.schema.js';
import { schemaValidator } from "../shared/schemaValidator.js";
import { sessionData } from '../shared/sessionData.js';
import { adminValidator } from '../shared/adminValidator.js';
import { creatorValidator } from '../shared/creatorValidator.js';
import { adminOrCreatorValidator } from '../shared/adminOrCreatorValidator.js';
import { adminOrPdiOwnerValidator } from '../shared/adminOrPdiOwnerValidator.js';

export const puntoDeInteresRouter = Router()

//ENDPOINTS EXTRA

// Recibe una Localidad, una busqueda (string) y una lista de Tags (number[]) y retorna los PuntosDeInteres que cumplan con esos filtros
puntoDeInteresRouter.post('/filtro', filtro)

// Retorna todos los PuntosDeInteres creados por el usuario que está logeado
puntoDeInteresRouter.get('/usuarioPdis', sessionData, creatorValidator, getAllFromUsuarioLogeado) 

// Retorna todos los PuntosDeInteres marcados como favoritos por el usuario logeado
puntoDeInteresRouter.get('/favoritos', sessionData, getFavoritos)

// Toma un  pdi y lo agrega a favoritos
puntoDeInteresRouter.post('/favorito', sessionData, addToFavoritos)
// Toma un pdi y lo saca de favoritos
puntoDeInteresRouter.delete('/favorito', sessionData, sacarDeFavoritos)
// Chequea si un pdi es favorito del usuario logeado
puntoDeInteresRouter.get('/favorito/:id', sessionData, esFavorito)

//CRUD BÁSICO
puntoDeInteresRouter.get('/', findAll)
puntoDeInteresRouter.get('/:id', findOne)
// Rutas Protegidas - Admin o Creador
puntoDeInteresRouter.post('/', sessionData, adminOrCreatorValidator, schemaValidator(puntoDeInteresSchema), add)
// Rutas Protegidas - Solo Admin o Dueño del PDI (Validado en Controlador)
puntoDeInteresRouter.get('/canEdit/:id', sessionData, adminOrPdiOwnerValidator, findOne) // Reutilizo findOne para chequear permisos de edicion
puntoDeInteresRouter.put('/:id', sessionData, adminOrPdiOwnerValidator, update)
puntoDeInteresRouter.delete('/:id', sessionData, adminOrPdiOwnerValidator, remove)



