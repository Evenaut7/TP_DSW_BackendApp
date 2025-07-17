import { Response, Request, NextFunction } from "express";
import { Provincia } from "./provincia.entity.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em;

export class ProvinciaController {
    findAll = async (req :Request, res : Response) => {
        try {
            const provincias = await em.find(
                Provincia, 
                {}, 
                { populate: ['localidades'] });
            res.status(200).json({message: 'Provincias found', data: provincias});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching provincias', error:error.message});
        }
    }
    findOne = async (req: Request, res: Response) => {
        try {
                const id = Number.parseInt(req.params.id);
                const provincia = await orm.em.findOneOrFail(Provincia, id , { populate: ['localidades'] });
                res.status(200).json({message: 'Provincia found', data: provincia});
            }catch (error: any) {
            res.status(500).json({message: 'Error fetching provincias', error:error.message});
        }
    }
    add = async (req: Request, res: Response)=> {
        try{
            const newProv = em.create(Provincia, req.body);
            await em.flush();
            res
                .status(201)
                .json({message: 'Provincia added successfully', data: newProv});
        }catch(error: any) {
            res.status(500).json({message: 'Error adding provincia', error:error.message});

        }
    }
    update = async(req: Request, res: Response) => {
        try{
            const id = Number.parseInt(req.params.id);
            const provincia = await em.findOneOrFail(Provincia, id);
            em.assign(provincia, req.body);
            await em.flush();
            res
                .status(200)
                .json({message: 'Provincia updated successfully', data: provincia});
        } catch (error: any) {
            res.status(500).json({message: 'Error updating provincia', error:error.message});
        }
    }
    
    delete = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const provinciaToRemove = em.getReference(Provincia, id);
            await em.removeAndFlush(provinciaToRemove);
            res.status(200).json({message: 'Provincia removed successfully', data: provinciaToRemove});
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

}
