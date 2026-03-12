import { Request, Response } from 'express';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { orm } from '../shared/db/orm.js';
import { EntityManager } from '@mikro-orm/mysql';
import { Evento } from './evento.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';

const em = orm.em as EntityManager;

export class EventoController {
  findAll = async (req: Request, res: Response) => {
    try {
      const eventos = await em.find(Evento, {}, { populate: ['tags'] });
      res.status(200).json({ message: 'Found all Eventos', data: eventos });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const evento = await em.findOneOrFail(Evento, { id }, { populate: ['tags'] });
      res.status(200).json({ message: 'Evento found successfully', data: evento });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  add = async (req: Request, res: Response) => {
    try {
      const { titulo, puntoDeInteres, horaDesde, horaHasta } = req.body;

      if (horaDesde >= horaHasta) {
        res.status(400).json({
          message: 'El horario de inicio no puede ser superior al horario de finalización',
        });
        return;
      }

      const existe = await em.findOne(Evento, { titulo, puntoDeInteres });
      if (existe) {
        res
          .status(409)
          .json({ message: `Ya existe un evento '${titulo}' en ese punto de interés` });
        return;
      }

      const newEvento = em.create(Evento, req.body);
      await em.flush();
      res.status(201).json({ message: 'Evento created successfully', data: newEvento });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res
          .status(409)
          .json({ message: `Ya existe un evento '${req.body.titulo}' en ese punto de interés` });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const eventoActual = await em.findOneOrFail(Evento, id);

      const horaDesde = req.body.horaDesde ?? eventoActual.horaDesde;
      const horaHasta = req.body.horaHasta ?? eventoActual.horaHasta;
      if (horaDesde >= horaHasta) {
        res.status(400).json({
          message: 'El horario de inicio no puede ser superior o igual al horario de finalización',
        });
        return;
      }

      if (req.body.titulo || req.body.puntoDeInteres) {
        const tituloAVerificar = req.body.titulo ?? eventoActual.titulo;
        const pdiAVerificar = req.body.puntoDeInteres ?? eventoActual.puntoDeInteres.id;

        const existe = await em.findOne(Evento, {
          titulo: tituloAVerificar,
          puntoDeInteres: pdiAVerificar,
        });
        if (existe && existe.id !== id) {
          res
            .status(409)
            .json({ message: `Ya existe un evento '${tituloAVerificar}' en ese punto de interés` });
          return;
        }
      }

      em.assign(eventoActual, req.body);
      await em.flush();
      res.status(200).json({ message: 'Evento updated successfully', data: eventoActual });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res
          .status(409)
          .json({ message: `Ya existe un evento '${req.body.titulo}' en ese punto de interés` });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const eventoToRemove = em.getReference(Evento, id);
      await em.removeAndFlush(eventoToRemove);
      res.status(200).json({ message: 'Evento removed successfully', data: eventoToRemove });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  estaAgendado = async (req: Request, res: Response) => {
    try {
      const usuarioId = req.user?.id;
      const eventoId = Number.parseInt(req.params.id);
      if (!usuarioId) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }
      const evento = await em.findOneOrFail(Evento, { id: eventoId }, { populate: ['usuarios'] });
      const estaAgendado = evento.usuarios.getItems().some((user) => user.id === usuarioId);
      res.status(200).json({ message: 'Chequeo de agenda realizado', data: { estaAgendado } });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  addEventoToUsuarioAgenda = async (req: Request, res: Response) => {
    try {
      const usuarioId = req.user?.id;
      const eventoId = req.body.id;
      if (!usuarioId) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }
      const evento = await em.findOneOrFail(Evento, { id: eventoId }, { populate: ['usuarios'] });
      const yaEstaAgendado = evento.usuarios.getItems().some((user) => user.id === usuarioId);
      if (yaEstaAgendado) {
        res.status(400).json({ message: 'El evento ya está en la agenda del usuario' });
        return;
      }
      const usuario = await em.findOneOrFail(Usuario, usuarioId);
      evento.usuarios.add(usuario);
      await em.flush();
      res.status(200).json({ message: 'Evento añadido a la agenda del usuario', data: evento });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  sacarDeAgenda = async (req: Request, res: Response) => {
    try {
      const usuarioId = req.user?.id;
      const eventoId = req.body.id;
      if (!usuarioId) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }
      const usuario = await em.findOneOrFail(
        Usuario,
        { id: usuarioId },
        { populate: ['agendaEvento'] }
      );
      const evento = await em.findOneOrFail(Evento, { id: eventoId });
      if (!usuario.agendaEvento.contains(evento)) {
        res.status(400).json({ message: 'El evento no está en la agenda del usuario' });
        return;
      }
      usuario.agendaEvento.remove(evento);
      await em.flush();
      res
        .status(200)
        .json({ message: 'Evento eliminado de la agenda del usuario', data: evento.id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getAgenda = async (req: Request, res: Response) => {
    try {
      const usuarioId = req.user?.id;
      if (!usuarioId) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }
      const usuario = await em.findOneOrFail(
        Usuario,
        { id: usuarioId },
        { populate: ['agendaEvento', 'agendaEvento.tags'] }
      );
      res.status(200).json({
        message: 'Eventos en la agenda del usuario',
        data: usuario.agendaEvento.getItems(),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  filtro = async (req: Request, res: Response) => {
    try {
      const { pdi, tags, busqueda } = req.body;

      if (!tags || tags.length === 0) {
        const eventosFiltrados = await em
          .createQueryBuilder(Evento, 'evento')
          .select('evento.*')
          .leftJoinAndSelect('evento.tags', 'tag')
          .where({ puntoDeInteres: pdi })
          .andWhere({ titulo: { $like: `%${busqueda}%` } })
          .getResultList();
        res.status(200).json({ message: 'Filtered Eventos', data: eventosFiltrados });
        return;
      }

      const eventosFiltrados = await em
        .createQueryBuilder(Evento, 'evento')
        .select('evento.*')
        .leftJoin('evento.tags', 'tag')
        .where({ 'evento.puntoDeInteres': pdi })
        .andWhere({ 'evento.titulo': { $like: `%${busqueda}%` } })
        .andWhere({ 'tag.id': { $in: tags } })
        .groupBy('evento.id')
        .having(`COUNT(DISTINCT tag.id) = ${tags.length}`)
        .getResultList();

      await em.populate(eventosFiltrados, ['tags']);
      res.status(200).json({ message: 'Filtered Eventos', data: eventosFiltrados });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
