import { Response, Request } from "express";
import { orm } from "../shared/db/orm.js";
import { Usuario } from "./usuario.entity.js";

const em = orm.em;

export class UsuarioController {
    findAll = async (req: Request, res: Response) => {
        try {
            const usuarios = await em.find(
                Usuario, 
                {}, 
                { populate: ['localidad','localidad.provincia', 'puntosDeInteres', 'favoritos', 'agendaPDI', 'valoraciones'] });
            res.status(200).json({message: 'Usuarios found', data: usuarios});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching usuarios', error:error.message});
        }
    }

    findOne = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const usuario = await em.findOneOrFail(Usuario, id , { populate: ['localidad','localidad.provincia', 'puntosDeInteres', 'favoritos', 'agendaPDI', 'valoraciones'] });
            res.status(200).json({message: 'Usuario found', data: usuario});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching usuario', error:error.message});
        }
    }

    add = async (req: Request, res: Response) => {
        try {
            const newUser = em.create(Usuario, req.body);
            await em.flush();
            res.status(201).json({message: 'Usuario added successfully', data: newUser});
        } catch (error: any) {
            res.status(500).json({message: 'Error adding usuario', error:error.message});
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const usuario = await em.findOneOrFail(Usuario, id);
            em.assign(usuario, req.body);
            await em.flush();
            res.status(200).json({message: 'Usuario updated successfully', data: usuario});
        } catch (error: any) {
            res.status(500).json({message: 'Error updating usuario', error:error.message});
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.id);
            const usuarioToRemove = em.getReference(Usuario, id);
            await em.removeAndFlush(usuarioToRemove);
            res.status(200).json({message: 'Usuario removed successfully', data: usuarioToRemove});
        } catch (error: any) {    
            res.status(500).json({message: 'Error removing usuario', error:error.message});
        }
    }
} 