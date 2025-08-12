import { Response, Request, NextFunction } from "express";
import { Localidad } from "./localidad.entity.js";
import { orm } from "../shared/db/orm.js";
import * as fs from 'fs/promises';  

const em = orm.em;

export class LocalidadController {
    findAll = async (req :Request, res : Response) => {
        try {
            const localidades = await em.find(Localidad, {}, {populate: ['provincia']});
            res.status(200).json({message: 'Localidades found', data: localidades});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching localidades', error:error.message});
        }
    }
    findOne = async (req: Request, res: Response) => {
    try {
            const id = Number.parseInt(req.params.id);
            const localidad = await orm.em.findOneOrFail(Localidad, {id}, {populate: ['provincia']});
            res.status(200).json({message: 'Localidad found', data: localidad});
        }catch (error: any) {
            res.status(500).json({message: 'Error fetching localidades', error:error.message});
        }
    }
    add = async (req: Request, res: Response)=> {
        const imagen = req.file ? req.file.filename : undefined;
        try{
            const newLoc = em.create(Localidad, Object.assign({imagen}, req.body));
            await em.flush();
            res
                .status(201)
                .json({message: 'Localidad added successfully', data: newLoc});
        }catch(error: any) {
            if (imagen != undefined) {
                try {
                    await fs.unlink(`uploads/${imagen}`);
                } catch (fsErr) {
                    console.error("Error deleting uploaded image after failure:", fsErr);
                }
            }
            res.status(500).json({message: 'Error adding localidad', error:error.message});
        }
    }
    update = async(req: Request, res: Response) => {
        try{
            const id = Number.parseInt(req.params.id);
            const localidad = await em.findOneOrFail(Localidad, id);
            const imagen = req.file ? req.file.filename : undefined
            await fs.unlink('uploads/' + localidad.imagen);
            localidad.imagen = imagen
            em.assign(localidad, req.body);
            await em.flush();
            res
                .status(200)
                .json({message: 'Localidad updated successfully', data: localidad});
        } catch (error: any) {
            res.status(500).json({message: 'Error updating localidad', error:error.message});
        }
    }
    
    delete = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const localidad = await em.getReference(Localidad, id);
            await em.removeAndFlush(localidad);
            res.status(200).json({message: 'Localidad deleted successfully'});
        } catch (error: any) {
            res.status(500).json({message: 'Error deleting localidad', error:error.message});
        }
    }

}