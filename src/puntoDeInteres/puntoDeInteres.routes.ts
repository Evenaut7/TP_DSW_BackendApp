import { Router } from 'express'
import { findAll, findOne, add, update, remove, filtro, getAllFromUsuarioLogeado, addToFavoritos, sacarDeFavoritos, esFavorito, getFavoritos} from './puntoDeInteres.controler.js'
import { puntoDeInteresSchema } from './puntoDeInteres.schema.js';
import { schemaValidator } from "../shared/schemaValidator.js";
import { sessionData } from '../shared/sessionData.js';
import { adminValidator } from '../shared/adminValidator.js';

export const puntoDeInteresRouter = Router()

//ENDPOINTS EXTRA

// Recibe una Localidad, una busqueda (string) y una lista de Tags (number[]) y retorna los PuntosDeInteres que cumplan con esos filtros
puntoDeInteresRouter.post('/filtro', filtro)

// Retorna todos los PuntosDeInteres creados por el usuario que está logeado
puntoDeInteresRouter.get('/usuarioPdis', sessionData, getAllFromUsuarioLogeado) 

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
// Rutas Protegidas - Admin 
puntoDeInteresRouter.use('/', sessionData, adminValidator); // Por ahora solo validamos que sea admin, pero deberemos validar que sea admin o dueño del pdi
puntoDeInteresRouter.post('/', schemaValidator(puntoDeInteresSchema), add)
puntoDeInteresRouter.put('/:id', update)
puntoDeInteresRouter.delete('/:id', remove)



