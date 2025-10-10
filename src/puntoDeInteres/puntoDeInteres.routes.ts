import { Router } from 'express'
import { findAll, findOne, add, update, remove, filtro, getAllFromUsuarioLogeado } from './puntoDeInteres.controler.js'
import { puntoDeInteresSchema } from './puntoDeInteres.schema.js';
import { schemaValidator } from "../shared/schemaValidator.js";
import { sessionData } from '../shared/sessionData.js';

export const puntoDeInteresRouter = Router()

//ENDPOINTS EXTRA
// Recibe una Localidad, una busqueda (string) y una lista de Tags (number[]) y retorna los PuntosDeInteres que cumplan con esos filtros
puntoDeInteresRouter.post('/filtro', filtro)
// Retorna todos los PuntosDeInteres creados por el usuario que está logeado
puntoDeInteresRouter.get('/usuarioLogeado', sessionData, getAllFromUsuarioLogeado) 

//CRUD BÁSICO
puntoDeInteresRouter.get('/', findAll)
puntoDeInteresRouter.get('/:id', findOne)
puntoDeInteresRouter.post('/', schemaValidator(puntoDeInteresSchema), add)
puntoDeInteresRouter.put('/:id', update)
puntoDeInteresRouter.delete('/:id', remove)



