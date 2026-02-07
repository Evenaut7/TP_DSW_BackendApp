import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './tag.controler.js';
import { schemaValidator } from '../shared/schemaValidator.js';
import { tagSchema, tagUpdateSchema } from './tag.schema.js';
import { adminValidator } from '../shared/adminValidator.js';
import { sessionData } from '../shared/sessionData.js';

export const tagRouter = Router();

// CRUD Basico
tagRouter.get('/', findAll);
tagRouter.get('/:id', findOne);
// Rutas Protegidas - Solo Admin
tagRouter.post('/',sessionData, adminValidator, schemaValidator(tagSchema), add);
tagRouter.put('/:id', sessionData, adminValidator, schemaValidator(tagUpdateSchema), update);
tagRouter.patch('/:id', sessionData, adminValidator, schemaValidator(tagUpdateSchema), update);
tagRouter.delete('/:id', sessionData, adminValidator, remove);
