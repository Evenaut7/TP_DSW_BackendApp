import { NextFunction, Request, Response } from 'express'
import { orm } from '../db/orm.js'
import { PuntoDeInteres } from '../../puntoDeInteres/puntoDeInteres.entity.js'

const em = orm.em

export async function adminOrPdiOwnerValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id)
    const pdi = await em.findOneOrFail(PuntoDeInteres, { id }, { populate: ['usuario'] })
    
    const usuario = req.user
    
    if (!usuario) {
      res.status(401).json({ message: 'No autenticado' })
      return
    }
    
    const esOwner = pdi.usuario.id === usuario.id
    const esAdmin = usuario.tipo === 'admin' 
    
    if (esOwner || esAdmin) {
      next()
      return
    }
    
    res.status(403).json({ message: 'No autorizado: debe ser dueño del PDI o admin' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}