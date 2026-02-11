import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Tag } from "./tag.entity.js";

const em = orm.em;

export class TagController {
  async findAll(req: Request, res: Response) {
    try {
      const tags = await em.find(Tag, {});
      res.status(200).json({ message: "finded all tags", data: tags });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const findedTag = await em.findOneOrFail(Tag, { id });
      res.status(200).json({ message: "tag finded", data: findedTag });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async add(req: Request, res: Response) {
    try {
      const newTag = em.create(Tag, req.body);
      await em.flush();
      res.status(201).json({ message: "Tag created", data: newTag });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Nota: Si el id no existe, la api devuelve un mensaje de exito y no de error
  async update(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const tagToUpdate = em.getReference(Tag, id);
      em.assign(tagToUpdate, req.body);
      await em.flush();
      res.status(201).json({ message: "tag updated successfully if it exists" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const tagToDelete = em.getReference(Tag, id);
      await em.removeAndFlush(tagToDelete);
      res.status(200).json({ message: "tag deleted successfully if it existed" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}