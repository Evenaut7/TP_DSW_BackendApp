import { NextFunction, Request, Response } from 'express'

function findAll(req: Request, res: Response){
  res.status(500).json({ message: 'Not Implemented'})
}


function findOne(req: Request, res: Response){
  res.status(500).json({ message: 'Not Implemented'})
}


function add(req: Request, res: Response) {
  res.status(500).json({ message: 'Not Implemented'})
}


function update(req: Request, res: Response) {
  res.status(500).json({ message: 'Not Implemented'})
}


function remove(req: Request, res: Response) {
  res.status(500).json({ message: 'Not Implemented'})
}


export {findAll, findOne, add, update, remove}