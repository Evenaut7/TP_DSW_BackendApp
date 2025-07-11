import { NextFunction, Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { PuntoDeInteres } from './puntoDeInteres.entity.js'

const em = orm.em

//Faltaria crear una sanitizeInput

async function findAll(req: Request, res: Response) {
  try {
    const puntosDeInteres = await em.find(PuntoDeInteres, {}, {populate: ['eventos', 'eventos.tags' , 'tags']})
    res.status(200).json({message: 'Found all Puntos De Interes', data: puntosDeInteres})
  } 
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const newPuntoDeInteres = em.create(PuntoDeInteres, req.body)
    await em.flush()
    res.status(201).json({message: 'Punto De Interes created successfully', data: newPuntoDeInteres})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const findedPuntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id }, {populate: ['eventos', 'eventos.tags' , 'tags']})
    res.status(200).json({message: "Punto De Interes finded successfully", data: findedPuntoDeInteres})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
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

async function remove(req: Request, res: Response) {
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

export { findAll, findOne, add, update, remove };
