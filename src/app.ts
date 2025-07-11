import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import { tagRouter } from './tag/tag.routes.js'
import { puntoDeInteresRouter } from './puntoDeInteres/puntoDeInteres.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { eventoRouter } from './evento/evento.routes.js'

const app = express()
app.use(express.json())

//After 
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

//Before
app.use('/api/tags', tagRouter)
app.use('/api/puntosDeInteres', puntoDeInteresRouter)
app.use('/api/evento', eventoRouter)

app.use((_,res) => {
  res.status(404).send({message: 'Resource not found'});
  return;
})

await syncSchema()

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
})