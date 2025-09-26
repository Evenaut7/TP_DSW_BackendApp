import {z} from 'zod';

export const puntoDeInteresSchema = z.object({
  body: z.object({
    nombre: z.string().min(1, {message: "nombre no puede estar vacío"}).max(255, {message: "nombre no puede superar los 255 caracteres"}),
    descripcion: z.string().min(1, {message: "descripcion no puede estar vacío"}).max(1024, {message: "descripcion no puede superar los 1024 caracteres"}),
    calle: z.string().min(1, {message: "calle no puede estar vacío"}).max(255, {message: "calle no puede superar los 255 caracteres"}),
    altura: z.number({message: "altura debe ser un número"}).int({message: "altura debe ser un número entero"}).positive({message: "altura debe ser un número positivo"}),
    privado: z.boolean({message: "privado es obligatorio"}),
    tags: z.array(z.number({message: "cada tag debe ser un número"}).int({message: "cada tag debe ser un número entero"}).positive({message: "cada tag debe ser un número positivo"})).optional(),
    localidad: z.number({message: "localidad es obligatorio"}).int({message: "localidad debe ser un número entero"}).positive({message: "localidad debe ser un número positivo"}),
    usuario: z.number({message: "usuario es obligatorio"}).int({message: "usuario debe ser un número entero"}).positive({message: "usuario debe ser un número positivo"}),
    imagen: z.string().min(1, {message: "imagen no puede estar vacío"}).max(255, {message: "imagen no puede superar los 255 caracteres"}),
  })
});