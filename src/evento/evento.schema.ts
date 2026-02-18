import { z } from 'zod';

export const eventoSchema = z.object({
  body: z.object({
    titulo: z.string().min(1, { message: "titulo no puede estar vacío" }).max(255, { message: "titulo no puede superar los 255 caracteres" }),
    descripcion: z.string().min(1, { message: "titulo no puede estar vacío" }).max(1024, { message: "titulo no puede superar los 1024 caracteres" }),
    horaDesde: z.string().nonempty({ message: "La hora inicial no puede estar vacia" }).refine((date) => !isNaN(Date.parse(date)), { message: "Formato de fecha Invalido" }),
    horaHasta: z.string().nonempty({ message: "La hora final no puede estar vacia" }).refine((date) => !isNaN(Date.parse(date)), { message: "Formato de fecha Invalido" }),
    estado: z.enum(["Disponible", "Cancelado"]),
    puntoDeInteres: z.number({ message: "El punto de interes es obligatorio" }).positive({ message: "El id del punto de interes debe ser un numero positivo" }),
    tags: z.array(z.number().positive({ message: "El id del tag debe ser un numero positivo" })).optional(),
    usuario: z.number().positive({ message: "El id del usuario debe ser un numero positivo" }).optional()
  })
});

export const eventoUpdateSchema = z.object({
  body: eventoSchema.shape.body.partial()
});