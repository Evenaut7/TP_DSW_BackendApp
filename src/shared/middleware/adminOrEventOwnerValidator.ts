import { NextFunction, Request, Response } from 'express'
import { orm } from '../db/orm.js'
import { Evento } from '../../evento/evento.entity.js'

const em = orm.em

export async function adminOrEventoOwnerValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id)
    const evento = await em.findOneOrFail(Evento, { id }, { populate: ['puntoDeInteres.usuario'] })
    
    const usuario = req.user
    
    if (!usuario) {
      res.status(401).json({ message: 'No autenticado' })
      return
    }

    const esOwner = evento.puntoDeInteres.usuario.id === usuario.id
    const esAdmin = usuario.tipo === 'admin' 
    
    if (esOwner || esAdmin) {
      next()
      return
    }
    
    res.status(403).json({ message: 'No autorizado: debe ser dueño del PDI del evento o admin' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}