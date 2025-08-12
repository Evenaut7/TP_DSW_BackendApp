import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path';
import { tagRouter } from './tag/tag.routes.js'
import { puntoDeInteresRouter } from './puntoDeInteres/puntoDeInteres.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { eventoRouter } from './evento/evento.routes.js'
import { provinciaRouter } from './provincia/provincia.routes.js'
import { localidadRouter } from './localidad/localidad.routes.js'
import { usuarioRouter } from './usuario/usuario.routes.js'
import { valoracionRouter } from './valoracion/valoracion.routes.js'
import { historiaRouter } from './historia/historia.routes.js' 


const app = express()
app.use(express.json())

// Cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


//After Middleware

app.use('/public', express.static('./uploads'))

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

//Before Middleware

app.use('/api/tags', tagRouter)
app.use('/api/puntosDeInteres', puntoDeInteresRouter)
app.use('/api/eventos', eventoRouter)
app.use('/api/provincias', provinciaRouter)
app.use('/api/localidades', localidadRouter)
app.use('/api/usuarios', usuarioRouter)
app.use('/api/valoraciones', valoracionRouter)
app.use('/api/historias', historiaRouter)

app.use((_,res) => {
  res.status(404).send({message: 'Resource not found'});
  return;
})

await syncSchema()

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
})