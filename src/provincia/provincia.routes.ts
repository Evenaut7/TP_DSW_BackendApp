import { Router } from 'express';
import { ProvinciaController } from './provincia.controller.js';
import { schemaValidator } from '../shared/schemaValidator.js';
import { provinciaSchema, provinciaUpdateSchema } from './provincia.schema.js';
import { sessionData } from '../shared/sessionData.js';
import { adminValidator } from '../shared/adminValidator.js';

export const provinciaRouter = Router();
const provinciaController = new ProvinciaController();

// CRUD BÁSICO
provinciaRouter.get('/', provinciaController.findAll);
provinciaRouter.get('/:id', provinciaController.findOne);

// Rutas Protegidas - Solo para admin
provinciaRouter.post('/', sessionData, adminValidator, schemaValidator(provinciaSchema), provinciaController.add);
provinciaRouter.put('/:id', sessionData, adminValidator, schemaValidator(provinciaUpdateSchema), provinciaController.update);
provinciaRouter.delete('/:id', sessionData, adminValidator, provinciaController.delete);
