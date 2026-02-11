import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { PuntoDeInteres} from './puntoDeInteres.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { EntityManager } from '@mikro-orm/mysql'
import { wrap } from '@mikro-orm/core';

const em = orm.em as EntityManager

export class PuntoDeInteresController {

  async findAll(req: Request, res: Response) {
    try {
      const puntosDeInteres = await em.find(PuntoDeInteres, {}, {populate: ['localidad.nombre', 'eventos', 'tags', 'valoraciones']})
      res.status(200).json({message: 'Found all Puntos De Interes', data: puntosDeInteres})
    } 
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async add(req: Request, res: Response) {
    try {
      const newPuntoDeInteres = em.create(PuntoDeInteres, req.body)
      await em.flush()
      res.status(201).json({message: 'Punto De Interes created successfully', data: newPuntoDeInteres})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)

      const pdi = await em.findOneOrFail(
        PuntoDeInteres,
        { id },
        { populate: ['eventos', 'eventos.tags', 'tags', 'valoraciones'] }
      );

      const promedioVal = await em
        .createQueryBuilder(PuntoDeInteres, 'pdi')
        .select('avg(valoracion.cant_estrellas) as promedio')
        .leftJoin('pdi.valoraciones', 'valoracion')
        .where({ id })
        .execute('get');

      const findedPuntoDeInteres = {
        ...wrap(pdi).toObject(),
        promedio: Number((promedioVal as any)?.promedio ?? 0),
      };

      res.status(200).json({message: "Punto De Interes finded successfully", data: findedPuntoDeInteres})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async update(req: Request, res: Response) {
    try {  
      const id = Number.parseInt(req.params.id)
      const puntoDeInteresToUpdate = await em.findOneOrFail( PuntoDeInteres, id)
      em.assign(puntoDeInteresToUpdate, req.body)
      await em.flush()
      res.status(200).json({message: 'Punto De Ineteres Updated successfully', data: puntoDeInteresToUpdate})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const puntoDeInteresToRemove = em.getReference(PuntoDeInteres, id)
      await em.removeAndFlush(puntoDeInteresToRemove)
      res.status(200).json({message: 'Punto De Interes removed successfully', data: puntoDeInteresToRemove})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async filtro(req: Request, res: Response) {
    try {

      const {localidad, tags, busqueda} = req.body;

      if (!tags || tags.length === 0) {
        const puntosFiltrados = await em.createQueryBuilder(PuntoDeInteres, 'pdi')
          .select('pdi.*')
          .leftJoinAndSelect('pdi.tags', 'tag')
          .where({ localidad: localidad })
          .andWhere({ nombre: { $like: `%${busqueda}%` } })
          .getResultList()

        res.status(200).json({ message: 'Filtered Puntos De Interes', data: puntosFiltrados });
        return;
      }
    
      const puntosFiltrados = await em.createQueryBuilder(PuntoDeInteres, 'pdi')
        .select('pdi.*')
        .leftJoin('pdi.tags', 'tag')
        .where({ 'pdi.localidad': localidad })
        .andWhere({ 'pdi.nombre': { $like: `%${busqueda}%` } })
        .andWhere({ 'tag.id': { $in: tags } })
        .groupBy('pdi.id')
        .having(`COUNT(DISTINCT tag.id) = ${tags.length}`) 
        .getResultList()

      await em.populate(puntosFiltrados, ['tags'])

      res.status(200).json({ message: 'Filtered Puntos De Interes', data: puntosFiltrados });
      return;

    } catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async getAllFromUsuarioLogeado(req: Request, res: Response) {
    try {
      const usuarioId = req.user?.id;
      const usuarioTipo = req.user?.tipo;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return; 
      }
      if (usuarioTipo === 'usuario') {
        res.status(403).json({ message: "Acceso denegado: usuario no es del tipo admin o creador" });
        return;
      }

      const puntosDeInteres = await em.find(
        PuntoDeInteres,
        { usuario: usuarioId },
        { populate: ["tags"] }
      );

      res.status(200).json({
        message: "Puntos de interés del usuario logeado",
        data: puntosDeInteres,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  async esFavorito(req: Request, res: Response) {
    try {
      const usuarioId = req.user?.id;
      const puntoDeInteresId = Number.parseInt(req.params.id);
      if (!usuarioId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return; 
      }
      const puntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id: puntoDeInteresId }, { populate: ['favoritoDe'] });
      const esFavorito = puntoDeInteres.favoritoDe.getItems().some(user => user.id === usuarioId);
      res.status(200).json({ message: "Chequeo de favorito realizado", data: { esFavorito } });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async addToFavoritos(req: Request, res: Response) {
    try {
      const usuarioId = req.user?.id;
      const puntoDeInteresId = req.body.id;
      if (!usuarioId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return; 
      }
      const puntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id: puntoDeInteresId }, { populate: ['favoritoDe'] });
      const yaEsFavorito = puntoDeInteres.favoritoDe.getItems().some(user => user.id === usuarioId);
      if (yaEsFavorito) {
        res.status(400).json({ message: "El punto de interés ya está en favoritos" });
        return
      } 
      const usuario = await em.findOneOrFail(Usuario, usuarioId)
      puntoDeInteres.favoritoDe.add(usuario);
      await em.flush();
      res.status(200).json({ message: "Punto de interés añadido a favoritos", data: puntoDeInteres });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async sacarDeFavoritos(req: Request, res: Response) {
    try {
      const usuarioId = req.user?.id;
      const puntoDeInteresId = req.body.id;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return
      }

      const usuario = await em.findOneOrFail(
        Usuario,
        { id: usuarioId },
        { populate: ['favoritos'] }
      );

      const puntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id: puntoDeInteresId });

      if (!usuario.favoritos.contains(puntoDeInteres)) {
        res.status(400).json({ message: "El punto de interés no está en favoritos" });
        return
      }
      usuario.favoritos.remove(puntoDeInteres);
      await em.flush();

      res.status(200).json({
        message: "Punto de interés eliminado de favoritos",
        data: puntoDeInteres.id 
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFavoritos(req: Request, res: Response) {
    try {
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const usuario = await em.findOneOrFail(
        Usuario,
        { id: usuarioId },
        { populate: ['favoritos', 'favoritos.tags'] }
      );

      res.status(200).json({
        message: "Puntos de interés favoritos del usuario",
        data: usuario.favoritos.getItems(),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

}