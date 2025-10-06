import { Response, Request } from "express";
import { orm } from "../shared/db/orm.js";
import { Usuario } from "./usuario.entity.js";
import {  clerkMiddleware, getAuth } from '@clerk/express'
import { get } from "http";

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

    lazyUpsert = async (req: Request, res: Response) => {
        const { userId } = getAuth(req);
        try {
            if (!userId){
                res.status(401).json({ error: 'No autorizado o token inválido.' });
            }else{
            const usuario = await em.findOne(Usuario, { clerkUserId: userId });
            
            if (!usuario) {
                console.log(`[Lazy Upsert] Creando nuevo usuario Clerk: ${userId}`);
                
                // --- Opcional: Obtener datos de Clerk ---
                // Si quisieras obtener el email/nombre, necesitarías el SDK de Clerk Node
                // (ej: import { clerkClient } from '@clerk/clerk-sdk-node';
                // const clerkUser = await clerkClient.users.getUser(clerkUserId); )
                // Pero por ahora, solo guardaremos lo mínimo.

                const newUsuario = new Usuario();
                newUsuario.clerkUserId = userId;
                newUsuario.tipo = 'Usuario'; // Valor por defecto
                // Aquí podrías mapear más campos si los tienes en Clerk y en tu entidad Usuario.
                    // Establecer metadatos propios por defecto:
                    
                    // Nota: Si localidad sigue siendo OBLIGATORIA en la entidad
                    // necesitarías añadirla aquí. Si la hiciste opcional (nullable: true), 
                    // puedes omitirla. Asumiremos que la hiciste opcional.
                await em.persistAndFlush(newUsuario);
                res.status(200).json({
                message: 'Usuario autenticado y sincronizado.',
                data: newUsuario,
                });
            } else {
                res.status(200).json({
                message: 'Usuario autenticado y sincronizado.',
                data: usuario
                });
                }
            }
        } catch (error: any) {
            console.error('Error en lazy upsert:', error);
            res.status(500).json({ message: 'Error interno del servidor al procesar el usuario.', error: error.message });
        }
    }
} 