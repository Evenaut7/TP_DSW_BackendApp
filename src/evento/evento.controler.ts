import { NextFunction, Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Evento } from './evento.entity.js'
import { PuntoDeInteres } from '../puntoDeInteres/puntoDeInteres.entity.js'

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const eventos = await em.find(Evento, {}, {populate: ['tags']})
    res.status(200).json({message: 'Found all Eventos', data: eventos})
  } 
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {

    const pdi = await em.findOneOrFail(PuntoDeInteres, { id: req.body.puntoDeInteres })
    const owner = pdi.usuario

    if (!owner) {
      res.status(400).json({ message: 'El Punto De Interes no tiene un dueño asignado' })
      return
    }

    if (owner.id !== req.user?.id && req.user?.tipo !== 'admin') {
      res.status(403).json({ message: 'No autorizado: debe ser dueño del PDI o admin para crear un evento' })
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

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const findedEvento = await em.findOneOrFail(Evento, { id }, {populate: ['tags']})
    res.status(200).json({message: "Evento finded successfully", data: findedEvento})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {  
    const id = Number.parseInt(req.params.id)
    const eventoToUpdate = await em.findOneOrFail( Evento, id)
    em.assign(eventoToUpdate, req.body)
    await em.flush()
    res.status(200).json({message: 'Evento Updated successfully', data: eventoToUpdate})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
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

export { findAll, findOne, add, update, remove };