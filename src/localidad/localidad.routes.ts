import { Router } from 'express';
import { LocalidadController } from './localidad.controller.js';
import { adminValidator } from '../shared/adminValidator.js';
import { sessionData } from '../shared/sessionData.js';
import { localidadSchema, localidadUpdateSchema } from './localidad.schema.js';
import { schemaValidator } from '../shared/schemaValidator.js';

export const localidadRouter = Router();
export const localidadController = new LocalidadController();

// CRUD Basico
localidadRouter.get('/', localidadController.findAll);
localidadRouter.get('/:id', localidadController.findOne);
localidadRouter.post('/filtro', localidadController.findByFiltro); // Filtrado por provincia y busqueda

// Rutas Protegidas - Solo Admin
localidadRouter.post('/', sessionData, adminValidator, schemaValidator(localidadSchema), localidadController.add);
localidadRouter.put('/:id', sessionData, adminValidator, schemaValidator(localidadUpdateSchema), localidadController.update);
localidadRouter.delete('/:id', sessionData, adminValidator, localidadController.delete);
