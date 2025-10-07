import { Response, Request } from "express";
import { orm } from "../shared/db/orm.js";
import { Usuario } from "./usuario.entity.js";
import {  clerkClient , getAuth } from '@clerk/express'
import { Localidad } from "../localidad/localidad.entity.js";
//import { get } from "http";

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
            const gmail = req.params.gmail;
            const usuario = await em.findOneOrFail(Usuario, { gmail }, { populate: ['localidad','localidad.provincia', 'puntosDeInteres', 'favoritos', 'agendaPDI', 'valoraciones'] });
            res.status(200).json({message: 'Usuario found', data: usuario});
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching usuario', error:error.message});
        }
    }
/* ***************** AHORA LA CREACION Y ACTUALIZACION DE USUARIO LAS HACE CLERK *******
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
            const gmail = req.params.gmail;
            const usuario = await em.findOneOrFail(Usuario, { gmail });
            em.assign(usuario, req.body);
            await em.flush();
            res.status(200).json({message: 'Usuario updated successfully', data: usuario});
        } catch (error: any) {
            res.status(500).json({message: 'Error updating usuario', error:error.message});
        }
    }
*/
    delete = async (req: Request, res: Response) => {
        try {
            const gmail = req.params.gmail;
            const usuarioToRemove = await em.findOne(Usuario, { gmail });
            if (usuarioToRemove) {
                await clerkClient.users.deleteUser(usuarioToRemove.clerkUserId);
                console.log(`[Clerk Sync] Usuario Clerk ${usuarioToRemove.clerkUserId} eliminado.`);
                await em.removeAndFlush(usuarioToRemove);  // Use ORM remove so cascades (valoraciones, etc.) are applied
                //falta la logica de eliminacion en clerk
                res.status(200).json({message: 'Usuario removed successfully', data: usuarioToRemove});
            } else {
                res.status(404).json({message: 'Usuario not found'});
            }
        } catch (error: any) {  
            res.status(500).json({message: 'Error removing usuario', error:error.message});
        }
    }

    lazyUpsert = async (req: Request, res: Response) => {
        const { userId } = getAuth(req);

        try {
            if (!userId) {
                res.status(401).json({ error: 'Fallo de autenticación.' });

            } else {

                const usuarioLocal = await em.findOne(Usuario, { clerkUserId: userId });
                const clerkUser = await clerkClient.users.getUser(userId); // 1. Obtener la data del usuario desde Clerk
                if (!usuarioLocal) {
                    // 2. Chequeo de seguridad / Edge Case
                    if (!clerkUser) {
                        console.error(`[SEGURIDAD CRÍTICA] Token válido pero usuario Clerk no encontrado: ${userId}`);
                        res.status(404).json({ message: 'Usuario Clerk no encontrado, acceso denegado.' });
                    }
                    // ------------------------------------------------------------------------
                    // 3. Lazy Upsert (CREAR USUARIO)
                    // ------------------------------------------------------------------------
                    // GMAIL
                    const primaryEmail = clerkUser.emailAddresses.find(
                        (email) => email.id === clerkUser.primaryEmailAddressId
                        )?.emailAddress ?? 'Sin Email'; 
                    if (primaryEmail === 'Sin Email') res.status(404).json({ message: 'Usuario Clerk sin gmail' });
                    console.log(`[Lazy Upsert] Creando nuevo usuario Clerk: ${userId}`);
                    
                    const newUsuario = em.create(Usuario, {
                        clerkUserId: userId,
                        nombreUsuario: clerkUser.username ?? undefined, // Manejo de null/undefined: usamos ?? para asignar 'Usuario' si fullName o username son nulos
                        gmail: primaryEmail,
                        tipo: 'Usuario'
                        });
                    
                    await em.persistAndFlush(newUsuario);

                    res.status(200).json({
                    message: 'Usuario autenticado y sincronizado.',
                    data: newUsuario
                    });
                    
                } else {
                    // ------------------------------------------------------------------------
                    // 3. Lazy Upsert (ACTUALIZAR USUARIO)
                    // ------------------------------------------------------------------------

                    // GMAIL
                    const primaryEmail = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId)?.emailAddress;
                    // NOMBRE
                    const newUserName = clerkUser.username;

                    const needsUpdate = (usuarioLocal.nombreUsuario !== newUserName) || (usuarioLocal.gmail !== primaryEmail);
                
                    if (needsUpdate) {
                        em.assign(usuarioLocal, {
                            nombreUsuario: newUserName,
                            gmail: primaryEmail
                        });
                    await em.persistAndFlush(usuarioLocal); 

                    res.status(200).json({
                    message: 'Usuario autenticado y sincronizado.',
                    data: usuarioLocal
                    });
                }
            }}
        }
        catch (error: any) {
            console.error('Error en lazy upsert:', error);
            res.status(500).json({ message: 'Error interno del servidor al procesar el usuario.', error: error.message });
        }
    }
    }