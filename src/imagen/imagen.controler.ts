import { Request, Response } from "express";
import * as fs from "fs/promises";

export class ImagenControler {
    add = async (req: Request, res: Response) => {
        if (!req.file) {
            res.status(400).json({ error: "No se subió ninguna imagen" });
        } else {
            try {
                res.status(201).json({
                    mensaje: "Imagen subida correctamente",
                    nombreArchivo: req.file.filename,
                    url: `http://localhost:3000/public/${req.file.filename}`,
                });
            } catch (error: any) {
                if (req.file) {
                    try {
                        await fs.unlink(`uploads/${req.file.filename}`);
                    } catch (fsErr: any) {
                        // opcional: loguear el error
                    }
                }
                res.status(500).json({
                    message: "Error al subir la imagen",
                    error: error.message,
                });
            }
        }
    };

    update = async (req: Request, res: Response) => {
        if (!req.file) {
            res.status(400).json({ error: "No se subió ninguna imagen" });
        } else {
            const id = req.params.id; // nombre de la imagen anterior
            try {
                await fs.unlink(`uploads/${id}`);
                res.status(200).json({
                    mensaje: "Imagen actualizada correctamente",
                    nombreArchivo: req.file.filename,
                    url: `http://localhost:3000/public/${req.file.filename}`,
                });
            } catch (error: any) {
                if (req.file) {
                    try {
                        await fs.unlink(`uploads/${req.file.filename}`);
                    } catch (fsErr: any) {
                        // opcional: loguear el error
                    }
                }
                res.status(500).json({
                    message: "Error al actualizar la imagen",
                    error: error.message,
                });
            }
        }
    };

    delete = async (req: Request, res: Response) => {
        const id = req.params.id; // nombre del archivo
        try {
            await fs.unlink(`uploads/${id}`);
            res.status(200).json({
                mensaje: "Imagen eliminada correctamente",
                nombreArchivo: id,
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Error al eliminar la imagen",
                error: error.message,
            });
        }
    };
}
