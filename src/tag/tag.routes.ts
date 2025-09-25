import { Router } from 'express'
import {findAll, findOne, add, update, remove} from './tag.controler.js'
import { schemaValidator } from '../schemaValidator.js'
import { tagSchema } from './tag.schema.js'

export const tagRouter = Router()

tagRouter.get('/', findAll)
tagRouter.get('/:id', findOne)
tagRouter.post('/', schemaValidator(tagSchema), add)
tagRouter.put('/:id', schemaValidator(tagSchema), update)
tagRouter.patch('/:id', schemaValidator(tagSchema), update)
tagRouter.delete('/:id', remove)
