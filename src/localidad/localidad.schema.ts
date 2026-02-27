import { z } from 'zod';

export const localidadSchema = z.object({
  body: z.object({
    nombre: z
      .string()
      .min(1, { message: "El nombre no puede estar vacío" })
      .max(255, { message: "El nombre no puede superar los 255 caracteres" }),
    
    provincia: z
      .number()
      .int()
      .positive({ message: "Debe seleccionar una provincia válida" }),

    descripcion: z
      .string()
      .max(1024, { message: "La descripción no puede superar los 1024 caracteres" })
      .optional(),
    
    imagen: z
      .string()
      .max(255, { message: "El nombre de imagen no puede superar los 255 caracteres" })
      .optional(),

    latitud: z
      .number()
      .min(-90)
      .max(90)
      .optional(),

    longitud: z
      .number()
      .min(-180)
      .max(180)
      .optional(),
  })
});

export const localidadUpdateSchema = z.object({
  body: localidadSchema.shape.body.partial()
});