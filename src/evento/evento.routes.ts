import { Router } from 'express'
import { EventoController } from "./evento.controller.js"
import { schemaValidator } from '../shared/middleware/schemaValidator.js'
import { eventoSchema, eventoUpdateSchema } from './evento.schema.js'
import { sessionData } from '../shared/middleware/sessionData.js'
import { adminValidator } from '../shared/middleware/adminValidator.js'
import { adminOrEventoOwnerValidator } from '../shared/middleware/adminOrEventOwnerValidator.js'

const eventoController = new EventoController()

export const eventoRouter = Router()

//CRUD BÁSICO
eventoRouter.get('/', eventoController.findAll)
eventoRouter.get('/:id', eventoController.findOne)

// Rutas Protegidas
eventoRouter.post('/', sessionData, schemaValidator(eventoSchema), eventoController.add) // El control de permisos se hace en el controlador
eventoRouter.put('/:id', sessionData, adminOrEventoOwnerValidator, schemaValidator(eventoUpdateSchema), eventoController.update)
eventoRouter.patch('/:id', sessionData, adminOrEventoOwnerValidator, schemaValidator(eventoUpdateSchema), eventoController.update)
eventoRouter.delete('/:id', sessionData, adminOrEventoOwnerValidator, eventoController.remove)