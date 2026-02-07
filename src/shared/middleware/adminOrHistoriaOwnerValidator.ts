import { NextFunction, Request, Response } from 'express'
import { orm } from '../db/orm.js'
import { Historia } from '../../historia/historia.entity.js'

const em = orm.em

export async function adminOrHistoriaOwnerValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id)
    const historia = await em.findOneOrFail(Historia, { id }, { populate: ['puntoDeInteres.usuario'] })
    
    const usuario = req.user
    
    if (!usuario) {
      res.status(401).json({ message: 'No autenticado' })
      return
    }

    const esOwner = historia.puntoDeInteres.usuario.id === usuario.id
    const esAdmin = usuario.tipo === 'admin' 
    
    if (esOwner || esAdmin) {
      next()
      return
    }
    
    res.status(403).json({ message: 'No autorizado: debe ser dueño del PDI de la historia o admin' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}