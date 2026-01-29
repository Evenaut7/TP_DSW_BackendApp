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
tagRouter.use('/', sessionData, adminValidator);
tagRouter.post('/', schemaValidator(tagSchema), add);
tagRouter.put('/:id', schemaValidator(tagUpdateSchema), update);
tagRouter.patch('/:id', schemaValidator(tagUpdateSchema), update);
tagRouter.delete('/:id', remove);
