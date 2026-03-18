import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import { cloudinary } from '../shared/multer.js';
import { config } from '../shared/config.js';

const isProd = config.server.nodeEnv === 'production';

export class ImagenControler {
  add = async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No se subió ninguna imagen' });
      return;
    }
    try {
      const url = isProd
        ? req.file.path                                          
        : `${config.storage.backendUrl}/public/${req.file.filename}`; 

      res.status(201).json({
        mensaje: 'Imagen subida correctamente',
        nombreArchivo: req.file.filename,
        url,
      });
    } catch (error: any) {
      if (!isProd && req.file) {
        await fs.unlink(`uploads/${req.file.filename}`).catch(() => {});
      }
      res.status(500).json({ message: 'Error al subir la imagen', error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: 'No se subió ninguna imagen' });
      return;
    }
    const id = req.params.id;
    try {
      if (isProd) {
        await cloudinary.uploader.destroy(`traveldb/${id}`);
      } else {
        await fs.unlink(`uploads/${id}`).catch(() => {});
      }

      const url = isProd
        ? req.file.path
        : `${config.storage.backendUrl}/public/${req.file.filename}`;

      res.status(200).json({
        mensaje: 'Imagen actualizada correctamente',
        nombreArchivo: req.file.filename,
        url,
      });
    } catch (error: any) {
      if (isProd) {
        await cloudinary.uploader.destroy(req.file.filename).catch(() => {});
      } else {
        await fs.unlink(`uploads/${req.file.filename}`).catch(() => {});
      }
      res.status(500).json({ message: 'Error al actualizar la imagen', error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      if (isProd) {
        await cloudinary.uploader.destroy(`traveldb/${id}`);
      } else {
        await fs.unlink(`uploads/${id}`);
      }
      res.status(200).json({ mensaje: 'Imagen eliminada correctamente', nombreArchivo: id });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar la imagen', error: error.message });
    }
  };
}