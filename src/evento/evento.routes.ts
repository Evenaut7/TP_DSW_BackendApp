import { Router } from 'express'
import {findAll, findOne, add, update, remove} from "./evento.controler.js"

export const eventoRouter = Router()

eventoRouter.get('/', findAll)
eventoRouter.get('/:id', findOne)
eventoRouter.post('/', add)
eventoRouter.put('/:id', update)
eventoRouter.patch('/:id', update)
eventoRouter.delete('/:id', remove)