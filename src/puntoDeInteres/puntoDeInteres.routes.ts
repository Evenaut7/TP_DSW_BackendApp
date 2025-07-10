import { Router } from 'express'
import {findAll, findOne, add, update, remove} from "./puntoDeInteres.controler.js"

export const puntoDeInteresRouter = Router()

puntoDeInteresRouter.get('/', findAll)
puntoDeInteresRouter.get('/:id', findOne)
puntoDeInteresRouter.post('/', add)
puntoDeInteresRouter.put('/:id', update)
puntoDeInteresRouter.patch('/:id', update)
puntoDeInteresRouter.delete('/:id', remove)