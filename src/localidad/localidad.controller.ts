import { Response, Request, NextFunction } from "express";
import { Localidad } from "./localidad.entity.js";
import { orm } from "../shared/db/orm.js";
import { EntityManager } from "@mikro-orm/mysql";

const em = orm.em as EntityManager;

export class LocalidadController {
    findAll = async (req :Request, res : Response) => {
        try {
            const localidades = await em.find(Localidad, {}, {populate: []});
            res.status(200).json({message: 'Localidades found', data: localidades});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching localidades', error:error.message});
        }
    }
    findOne = async (req: Request, res: Response) => {
    try {
            const id = Number.parseInt(req.params.id);
            const localidad = await orm.em.findOneOrFail(Localidad, {id}, {populate: ['provincia', 'puntosDeInteres']});
            res.status(200).json({message: 'Localidad found', data: localidad});
        }catch (error: any) {
            res.status(500).json({message: 'Error fetching localidades', error:error.message});
        }
    }
    add = async (req: Request, res: Response)=> {
        try{
            const newLoc = em.create(Localidad, req.body);
            await em.flush();
            res
                .status(201)
                .json({message: 'Localidad added successfully', data: newLoc});
        }catch(error: any) {
            res.status(500).json({message: 'Error adding localidad', error:error.message});
        }
    }
    update = async(req: Request, res: Response) => {
        try{
            const id = Number.parseInt(req.params.id);
            const localidad = await em.findOneOrFail(Localidad, id);
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
            await em.remove(localidad);
            await em.flush();
            res.status(200).json({message: 'Localidad deleted successfully'});
        } catch (error: any) {
            res.status(500).json({message: 'Error deleting localidad', error:error.message});
        }
    }
    
    findByFiltro = async (req: Request, res: Response) => {
        try {
            
            const {provincia, busqueda} = req.body;
            
            const localidadesFiltradas = await em.createQueryBuilder(Localidad, 'l')
                .where({ provincia: provincia })
                .andWhere({nombre : { $like: `%${busqueda}%` }})
                .getResultList();

            res.status(200).json({ message: 'Localidades filtered by province and name', data: localidadesFiltradas });

        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching localidades by province', error: error.message });
        }
    }

}