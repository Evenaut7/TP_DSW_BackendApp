import {z} from 'zod';

export const valoracionSchema = z.object({
  body: z.object({
    puntaje: z.number({message: "puntaje es obligatorio"}).int({message: "puntaje debe ser un número entero"}).min(1, {message: "puntaje debe ser al menos 1"}).max(5, {message: "puntaje no puede ser mayor a 5"}),
    comentario: z.string().min(1, {message: "comentario no puede estar vacío"}).max(1024, {message: "comentario no puede superar los 1024 caracteres"}).optional(),
    usuario: z.number({message: "usuario es obligatorio"}).int({message: "usuario debe ser un número entero"}).positive({message: "usuario debe ser un número positivo"}),
    puntoDeInteres: z.number({message: "puntoDeInteres es obligatorio"}).int({message: "puntoDeInteres debe ser un número entero"}).positive({message: "puntoDeInteres debe ser un número positivo"}),
  })
});

export const valoracionUpdateSchema = z.object({
  body: valoracionSchema.shape.body.partial()
});