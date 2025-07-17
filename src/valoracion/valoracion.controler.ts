import { Response, Request } from "express";
import { orm } from "../shared/db/orm.js";    

import { Valoracion } from "./valoracion.entity.js";
const em = orm.em;  

export class ValoracionController {
    findAll = async (req: Request, res: Response) => {
        try {
            const valoraciones = await em.find(
                Valoracion, 
                {}, 
                { populate: ['puntoDeInteres', 'usuario'] });
            res.status(200).json({message: 'Valoraciones found', data: valoraciones});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching valoraciones', error:error.message});
        }
    }

    findOne = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const valoracion = await em.findOneOrFail(Valoracion, id , { populate: ['puntoDeInteres', 'usuario'] });
            res.status(200).json({message: 'Valoracion found', data: valoracion});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching valoracion', error:error.message});
        }
    }

    add = async (req: Request, res: Response) => {
        try {
            if (req.body.cantEstrellas < 0 || req.body.cantEstrellas > 5) {
                throw new Error('Las estrellas deben estar entre 0 y 5');
            }
            const newValoracion = em.create(Valoracion, req.body);
            await em.flush();
            res.status(201).json({message: 'Valoracion added successfully', data: newValoracion});
        } catch (error: any) {
            res.status(500).json({message: 'Error adding valoracion', error:error.message});
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            if (req.body.cantEstrellas < 0 || req.body.cantEstrellas > 5) {
                throw new Error('Las estrellas deben estar entre 0 y 5');
            }            
            const id = Number.parseInt(req.params.id);
            const valoracion = await em.findOneOrFail(Valoracion, id);
            em.assign(valoracion, req.body);
            await em.flush();
            res.status(200).json({message: 'Valoracion updated successfully', data: valoracion});
        } catch (error: any) {
            res.status(500).json({message: 'Error updating valoracion', error:error.message});
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const valoracionToRemove = em.getReference(Valoracion, id);
            await em.removeAndFlush(valoracionToRemove);
            res.status(200).json({message: 'Valoracion removed  successfully', data: valoracionToRemove});    
        } catch (error: any) {    
            res.status(500).json({message: 'Error removing valoracion', error:error.message});
        }   
    }
} 