import { Router } from 'express'
import {findAll, findOne, add, update, remove} from "./evento.controler.js"
import { schemaValidator } from '../shared/schemaValidator.js'
import { eventoSchema } from './evento.schema.js'

export const eventoRouter = Router()

eventoRouter.get('/', findAll)
eventoRouter.get('/:id', findOne)
eventoRouter.post('/', schemaValidator(eventoSchema), add)
eventoRouter.put('/:id', update)
eventoRouter.patch('/:id', update)
eventoRouter.delete('/:id', remove)