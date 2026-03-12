import { Request, Response } from 'express';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { orm } from '../shared/db/orm.js';
import { Tag } from './tag.entity.js';

const em = orm.em;

export class TagController {
  findAll = async (req: Request, res: Response) => {
    try {
      const tags = await em.find(Tag, {});
      res.status(200).json({ message: 'Tags found', data: tags });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const tag = await em.findOneOrFail(Tag, { id });
      res.status(200).json({ message: 'Tag found', data: tag });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const existe = await em.findOne(Tag, { nombre: req.body.nombre });
      if (existe) {
        res.status(409).json({ message: `Ya existe un tag con el nombre '${req.body.nombre}'` });
        return;
      }

      const newTag = em.create(Tag, req.body);
      await em.flush();
      res.status(201).json({ message: 'Tag created', data: newTag });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res.status(409).json({ message: `Ya existe un tag con el nombre '${req.body.nombre}'` });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);

      if (req.body.nombre) {
        const existe = await em.findOne(Tag, { nombre: req.body.nombre });
        if (existe && existe.id !== id) {
          res.status(409).json({ message: `Ya existe un tag con el nombre '${req.body.nombre}'` });
          return;
        }
      }

      const tag = await em.findOneOrFail(Tag, id);
      em.assign(tag, req.body);
      await em.flush();
      res.status(200).json({ message: 'Tag updated successfully', data: tag });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res.status(409).json({ message: `Ya existe un tag con el nombre '${req.body.nombre}'` });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const tag = em.getReference(Tag, id);
      await em.removeAndFlush(tag);
      res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
