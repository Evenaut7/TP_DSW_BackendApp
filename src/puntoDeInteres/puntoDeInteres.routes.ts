import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './puntoDeInteres.controler.js'
import { uploadImages } from '../multer.js';
import { puntoDeInteresSchema } from './puntoDeInteres.schema.js';
import { schemaValidator } from "../schemaValidator.js";

export const puntoDeInteresRouter = Router()

puntoDeInteresRouter.get('/', findAll)
puntoDeInteresRouter.get('/:id', findOne)
puntoDeInteresRouter.post('/', uploadImages.array('imagenes'), add)
puntoDeInteresRouter.put('/:id', uploadImages.array('imagenes'), update)
puntoDeInteresRouter.delete('/:id', remove)

// Agregar el Schema Valdiator