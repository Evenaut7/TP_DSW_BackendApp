import { z } from 'zod';

export const provinciaSchema = z.object({
  body: z.object({
    nombre: z.string().min(1, { message: "nombre no puede estar vacío" }).max(255, { message: "nombre no puede superar los 255 caracteres" }),
    localidades: z.array(z.number({message: "cada localidad debe ser un número"}).int({message: "cada localidad debe ser un número entero"}).positive({message: "cada localidad debe ser un número positivo"})).optional(),
  })
});

export const provinciaUpdateSchema = z.object({
  body: provinciaSchema.shape.body.partial()
});