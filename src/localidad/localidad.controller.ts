import { Response, Request } from 'express';
import { Localidad } from './localidad.entity.js';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { orm } from '../shared/db/orm.js';
import { EntityManager } from '@mikro-orm/mysql';

const em = orm.em as EntityManager;

export class LocalidadController {
  findAll = async (req: Request, res: Response) => {
    try {
      const localidades = await em.find(Localidad, {}, { populate: [] });
      res.status(200).json({ message: 'Localidades found', data: localidades });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching localidades', error: error.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const localidad = await em.findOneOrFail(
        Localidad,
        { id },
        { populate: ['provincia', 'puntosDeInteres'] }
      );
      res.status(200).json({ message: 'Localidad found', data: localidad });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching localidad', error: error.message });
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const existe = await em.findOne(Localidad, {
        nombre: req.body.nombre,
        provincia: req.body.provincia,
      });
      if (existe) {
        res
          .status(409)
          .json({ message: `Ya existe la localidad '${req.body.nombre}' en esa provincia` });
        return;
      }

      const newLoc = em.create(Localidad, req.body);
      await em.flush();
      res.status(201).json({ message: 'Localidad added successfully', data: newLoc });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res
          .status(409)
          .json({ message: `Ya existe la localidad '${req.body.nombre}' en esa provincia` });
        return;
      }
      res.status(500).json({ message: 'Error adding localidad', error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);

      if (req.body.nombre || req.body.provincia) {
        const localidadActual = await em.findOneOrFail(Localidad, id, { populate: ['provincia'] });

        const nombreAVerificar = req.body.nombre ?? localidadActual.nombre;
        const provinciaAVerificar = req.body.provincia ?? localidadActual.provincia.id;

        const existe = await em.findOne(Localidad, {
          nombre: nombreAVerificar,
          provincia: provinciaAVerificar,
        });
        if (existe && existe.id !== id) {
          res
            .status(409)
            .json({ message: `Ya existe la localidad '${nombreAVerificar}' en esa provincia` });
          return;
        }

        em.assign(localidadActual, req.body);
        await em.flush();
        res.status(200).json({ message: 'Localidad updated successfully', data: localidadActual });
        return;
      }

      const localidad = await em.findOneOrFail(Localidad, id);
      em.assign(localidad, req.body);
      await em.flush();
      res.status(200).json({ message: 'Localidad updated successfully', data: localidad });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res
          .status(409)
          .json({
            message: `Ya existe la localidad '${req.body.nombre ?? 'indicada'}' en esa provincia`,
          });
        return;
      }
      res.status(500).json({ message: 'Error updating localidad', error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const localidad = em.getReference(Localidad, id);
      await em.removeAndFlush(localidad);
      res.status(200).json({ message: 'Localidad deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error deleting localidad', error: error.message });
    }
  };

  findByFiltro = async (req: Request, res: Response) => {
    try {
      const { provincia, busqueda } = req.body;
      const localidadesFiltradas = await em
        .createQueryBuilder(Localidad, 'l')
        .where({ provincia })
        .andWhere({ nombre: { $like: `%${busqueda}%` } })
        .getResultList();
      res.status(200).json({ message: 'Localidades filtered', data: localidadesFiltradas });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error fetching localidades by province', error: error.message });
    }
  };
}
