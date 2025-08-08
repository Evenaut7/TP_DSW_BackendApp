import { Request, Response } from "express";
import { Historia } from "./historia.entity.js";
import { orm } from "../shared/db/orm.js";  

const em = orm.em;  

export class HistoriaControler {
    findAll = async (req: Request, res: Response) => {
        try {
            const historias = await em.find(Historia, {}, { populate: ['puntoDeInteres'] });
            res.status(200).json({ message: 'Historias found', data: historias });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching historias', error: error.message });
        }
    }

    findOne = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const historia = await em.findOneOrFail(Historia, id, { populate: ['puntoDeInteres'] });
            res.status(200).json({ message: 'Historia found', data: historia });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching historia', error: error.message });
        }
    }

    add = async (req: Request, res: Response) => {
        try {
            const { titulo, fechaDesde, fechaHasta, descripcion, puntoDeInteres } = req.body;
            const imagen = req.file ? req.file.filename : undefined;
            const newHistoria = em.create(Historia, {
            titulo,
            fechaDesde,
            fechaHasta,
            descripcion,
            imagen,
            puntoDeInteres
            });

            await em.persistAndFlush(newHistoria);await em.persistAndFlush(newHistoria)
            res.status(201).json({ message: 'Historia added successfully', data: newHistoria });
        } catch (error: any) {
            res.status(500).json({ message: 'Error adding historia', error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const historia = await em.findOneOrFail(Historia, id);
            em.assign(historia, req.body);
            await em.flush();
            res.status(200).json({ message: 'Historia updated successfully', data: historia });
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating historia', error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const historiaToRemove = em.getReference(Historia, id);
            await em.removeAndFlush(historiaToRemove);
            res.status(200).json({ message: 'Historia removed successfully', data: historiaToRemove });
        } catch (error: any) {
            res.status(500).json({ message: 'Error removing historia', error: error.message });
        }     
    }
}
