import {z} from 'zod';

export const tagSchema = z.object({
  body: z.object({
    nombre: z.string().min(1, { message: "El nombre no puede estar vacío" }),
    tipo: z.string().min(1, { message: "El tipo no puede estar vacío" }),
  })
});

export const tagUpdateSchema = z.object({
  body: tagSchema.shape.body.partial()
});