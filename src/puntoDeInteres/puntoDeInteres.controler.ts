import { NextFunction, Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { PuntoDeInteres } from './puntoDeInteres.entity.js'
import { EntityManager, EntityRepository } from '@mikro-orm/mysql'

const em = orm.em

//Faltaria crear una sanitizeInput

async function findAll(req: Request, res: Response) {
  try {
    const puntosDeInteres = await em.find(PuntoDeInteres, {}, {populate: ['eventos', 'tags', 'valoraciones']})
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
    const findedPuntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id }, {populate: ['eventos', 'eventos.tags' , 'tags', 'valoraciones']})
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

async function filtro(req: Request, res: Response) {
  try {

    const {localidad, tags, busqueda} = req.body;

    const puntosDeInteres = await em.find(PuntoDeInteres, {
      localidad,
      ...(busqueda ? { nombre: { $like: `%${busqueda}%` } } : {})
    }, { populate: ['eventos', 'tags'] });

    // No es lo mas eficiente, pero funciona para pocos datos. No puede hacer andar el Query builder de MikroORM
    const puntosFiltrados = puntosDeInteres.filter(pdi =>
      tags.every((tagId: Number) => pdi.tags.getItems().some(tag => tag.id === tagId)));

    res.status(200).json({ message: 'Filtered Puntos De Interes', data: puntosFiltrados });

  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function getAllFromUsuarioLogeado(req: Request, res: Response) {
  console.log("Entré a la función");
  console.log("req.user:", req.user);

  try {
    const usuarioId = req.user?.id;
    if (!usuarioId) {
      res.status(401).json({ message: "Usuario no autenticado" });
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


export { findAll, findOne, add, update, remove, filtro, getAllFromUsuarioLogeado };