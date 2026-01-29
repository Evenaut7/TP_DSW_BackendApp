import {z} from 'zod';

export const usuarioSchema = z.object({
  body: z.object({
    nombre: z.string().min(1, {message: "nombre no puede estar vacío"}).max(255, {message: "nombre no puede superar los 255 caracteres"}),
    tipo: z.enum(['admin', 'usuario', 'creador' ], {message: "tipo debe ser 'administrador', 'usuario' o 'creador'"}),
    gmail: z.string().min(1, {message: "gmail no puede estar vacío"}).max(255, {message: "gmail no puede superar los 255 caracteres"}).email({message: "gmail debe tener formato de email"}),
    password: z.string().min(6, {message: "password debe tener al menos 6 caracteres"}).max(255, {message: "password no puede superar los 255 caracteres"}),
    cuit: z.string().min(11, {message: "cuit debe tener 11 caracteres"}).max(11, {message: "cuit debe tener 11 caracteres"}).optional(),
    localidad: z.number({message: "localidad es obligatorio"}).int({message: "localidad debe ser un número entero"}).positive({message: "localidad debe ser un número positivo"}).optional(),
    imagen: z.string().min(1, {message: "imagen no puede estar vacío"}).max(255, {message: "imagen no puede superar los 255 caracteres"}).optional(),
  })
});

export const usuarioUpdateSchema = z.object({
  body: usuarioSchema.shape.body.partial()
});