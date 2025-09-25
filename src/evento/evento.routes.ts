import { Router } from 'express'
import {findAll, findOne, add, update, remove} from "./evento.controler.js"
import { schemaValidator } from '../schemaValidator.js'
import { eventoSchema } from './evento.schema.js'

export const eventoRouter = Router()

eventoRouter.get('/', findAll)
eventoRouter.get('/:id', findOne)
eventoRouter.post('/', schemaValidator(eventoSchema), add)
eventoRouter.put('/:id', schemaValidator(eventoSchema), update)
eventoRouter.patch('/:id', schemaValidator(eventoSchema), update)
eventoRouter.delete('/:id', remove)