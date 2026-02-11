import { Router } from 'express';
import { TagController } from './tag.controller.js';
import { schemaValidator } from '../shared/middleware/schemaValidator.js';
import { tagSchema, tagUpdateSchema } from './tag.schema.js';
import { adminValidator } from '../shared/middleware/adminValidator.js';
import { sessionData } from '../shared/middleware/sessionData.js';

export const tagRouter = Router();

const tagController = new TagController()

// CRUD Basico
tagRouter.get('/', tagController.findAll);
tagRouter.get('/:id', tagController.findOne);
// Rutas Protegidas - Solo Admin
tagRouter.post('/',sessionData, adminValidator, schemaValidator(tagSchema), tagController.add);
tagRouter.put('/:id', sessionData, adminValidator, schemaValidator(tagUpdateSchema), tagController.update);
tagRouter.patch('/:id', sessionData, adminValidator, schemaValidator(tagUpdateSchema), tagController.update);
tagRouter.delete('/:id', sessionData, adminValidator, tagController.remove);
