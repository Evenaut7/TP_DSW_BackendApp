import {z} from 'zod';

export const historiaSchema = z.object({
  body: z.object({
    titulo: z.string().min(1, {message: "titulo no puede estar vacío"}).max(255, {message: "titulo no puede superar los 255 caracteres"}),
    descripcion: z.string().min(1, {message: "titulo no puede estar vacío"}).max(1024, {message: "titulo no puede superar los 1024 caracteres"}),
    fechaDesde: z.string().nonempty({message: "La fecha desde no puede estar vacia"}).refine((date) => !isNaN(Date.parse(date)), { message: "Formato de fecha Invalido" }),
    fechaHasta: z.string().nonempty({message: "La fecha hasta no puede estar vacia"}).refine((date) => !isNaN(Date.parse(date)), { message: "Formato de fecha Invalido" }),
    puntoDeInteres: z.number({message: "El punto de interes es obligatorio"}).positive({message: "El id del punto de interes debe ser un numero positivo"}), 
    imagen: z.string().min(1, {message: "imagen no puede estar vacío"}).max(255, {message: "imagen no puede superar los 255 caracteres"}),
  })
});