import { NextFunction, Request, Response } from 'express'
import { orm } from './db/orm.js'
import { Valoracion } from '../valoracion/valoracion.entity.js'

const em = orm.em

export async function adminOrValorationOwnerValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.id)
    const valoration = await em.findOneOrFail(Valoracion, { id }, { populate: ['usuario'] })
    
    const usuario = req.user
    
    if (!usuario) {
      res.status(401).json({ message: 'No autenticado' })
      return
    }
    
    const esOwner = valoration.usuario.id === usuario.id
    const esAdmin = usuario.tipo === 'admin' 
    
    if (esOwner || esAdmin) {
      next()
      return
    }
    
    res.status(403).json({ message: 'No autorizado: debe ser dueño de la valoracion o admin' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}