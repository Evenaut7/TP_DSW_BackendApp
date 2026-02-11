import { NextFunction, Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Evento } from './evento.entity.js'
import { PuntoDeInteres } from '../puntoDeInteres/puntoDeInteres.entity.js'

const em = orm.em

export class EventoController {
  async findAll(req: Request, res: Response) {
    try {
      const eventos = await em.find(Evento, {}, {populate: ['tags']})
      res.status(200).json({message: 'Found all Eventos', data: eventos})
    } 
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async add(req: Request, res: Response) {
    try {

      if(req.body.horaDesde >= req.body.horaHasta) {
        res.status(400).json({message: 'El horario de inicio no puede ser superior al horario de finalización'})
        return
      }

      const newEvento = em.create(Evento, req.body)
      await em.flush()
      res.status(201).json({message: 'Evento created successfully', data: newEvento})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const findedEvento = await em.findOneOrFail(Evento, { id }, {populate: ['tags']})
      res.status(200).json({message: "Evento finded successfully", data: findedEvento})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async update(req: Request, res: Response) {
    try {  
      const id = Number.parseInt(req.params.id)
      const eventoToUpdate = await em.findOneOrFail( Evento, id)
      
      const { horaDesde, horaHasta } = req.body;

      if (horaDesde && horaHasta) {
        if (horaDesde >= horaHasta) {
          res.status(400).json({
            message: 'El horario de inicio no puede ser superior o igual al horario de finalización'
          });
          return;
        }
      }
      else if (horaDesde && !horaHasta) {
        if (horaDesde >= eventoToUpdate.horaHasta) {
          res.status(400).json({
            message: 'El horario de inicio no puede ser superior o igual al horario de finalización'
          });
          return;
        }
      }
      else if (!horaDesde && horaHasta) {
        if (eventoToUpdate.horaDesde >= horaHasta) {
          res.status(400).json({
            message: 'El horario de inicio no puede ser superior o igual al horario de finalización'
          });
          return;
        }
      }

      em.assign(eventoToUpdate, req.body)
      await em.flush()
      res.status(200).json({message: 'Evento Updated successfully', data: eventoToUpdate})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const eventoToRemove = em.getReference(Evento, id)
      await em.removeAndFlush(eventoToRemove)
      res.status(200).json({message: 'Evento removed successfully', data: eventoToRemove})
    }
    catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }
}
