import { Router } from 'express'
import {findAll, findOne, add, update, remove} from "./evento.controler.js"
import { schemaValidator } from '../shared/schemaValidator.js'
import { eventoSchema } from './evento.schema.js'
import { sessionData } from '../sessionData.js'
import { adminValidator } from '../shared/adminValidator.js'

export const eventoRouter = Router()

//CRUD BÁSICO
eventoRouter.get('/', findAll)
eventoRouter.get('/:id', findOne)
// Rutas Protegidas - Admin
eventoRouter.use('/', sessionData, adminValidator); // Por ahora solo validamos que sea admin, pero deberemos validar que sea admin o dueño del evento
eventoRouter.post('/', schemaValidator(eventoSchema), add)
eventoRouter.put('/:id', update)
eventoRouter.patch('/:id', update)
eventoRouter.delete('/:id', remove)