import { Router } from 'express'
import {findAll, findOne, add, update, remove} from "./evento.controler.js"
import { schemaValidator } from '../shared/schemaValidator.js'
import { eventoSchema, eventoUpdateSchema } from './evento.schema.js'
import { sessionData } from '../shared/sessionData.js'
import { adminValidator } from '../shared/adminValidator.js'
import { adminOrEventoOwnerValidator } from '../shared/adminOrEventOwnerValidator.js'

export const eventoRouter = Router()

//CRUD BÁSICO
eventoRouter.get('/', findAll)
eventoRouter.get('/:id', findOne)

// Rutas Protegidas
eventoRouter.post('/', sessionData, schemaValidator(eventoSchema), add) // El control de permisos se hace en el controlador
eventoRouter.put('/:id', sessionData, adminOrEventoOwnerValidator, schemaValidator(eventoUpdateSchema), update)
eventoRouter.patch('/:id', sessionData, adminOrEventoOwnerValidator, schemaValidator(eventoUpdateSchema), update)
eventoRouter.delete('/:id', sessionData, adminOrEventoOwnerValidator, remove)