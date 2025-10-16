import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { PuntoDeInteres} from './puntoDeInteres.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

const em = orm.em

//Faltaria crear una sanitizeInput

async function findAll(req: Request, res: Response) {
  try {
    const puntosDeInteres = await em.find(PuntoDeInteres, {}, {populate: ['eventos', 'tags', 'valoraciones']})
    res.status(200).json({message: 'Found all Puntos De Interes', data: puntosDeInteres})
  } 
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const newPuntoDeInteres = em.create(PuntoDeInteres, req.body)
    await em.flush()
    res.status(201).json({message: 'Punto De Interes created successfully', data: newPuntoDeInteres})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const findedPuntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id }, {populate: ['eventos', 'eventos.tags' , 'tags', 'valoraciones']})
    res.status(200).json({message: "Punto De Interes finded successfully", data: findedPuntoDeInteres})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {  
    const id = Number.parseInt(req.params.id)
    const puntoDeInteresToUpdate = await em.findOneOrFail( PuntoDeInteres, id)
    em.assign(puntoDeInteresToUpdate, req.body)
    await em.flush()
    res.status(200).json({message: 'Punto De Ineteres Updated successfully', data: puntoDeInteresToUpdate})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const puntoDeInteresToRemove = em.getReference(PuntoDeInteres, id)
    await em.removeAndFlush(puntoDeInteresToRemove)
    res.status(200).json({message: 'Punto De Interes removed successfully', data: puntoDeInteresToRemove})
  }
  catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function filtro(req: Request, res: Response) {
  try {

    const {localidad, tags, busqueda} = req.body;

    const puntosDeInteres = await em.find(PuntoDeInteres, {
      localidad,
      ...(busqueda ? { nombre: { $like: `%${busqueda}%` } } : {})
    }, { populate: ['eventos', 'tags'] });

    // No es lo mas eficiente, pero funciona para pocos datos. No puede hacer andar el Query builder de MikroORM
    const puntosFiltrados = puntosDeInteres.filter(pdi =>
      tags.every((tagId: Number) => pdi.tags.getItems().some(tag => tag.id === tagId)));

    res.status(200).json({ message: 'Filtered Puntos De Interes', data: puntosFiltrados });

  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function getAllFromUsuarioLogeado(req: Request, res: Response) {
  try {
    const usuarioId = req.user?.id;
    const usuarioTipo = req.user?.tipo;

    if (!usuarioId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return; 
    }
    if (usuarioTipo === 'usuario') {
      res.status(403).json({ message: "Acceso denegado: usuario no es del tipo admin o creador" });
      return;
    }

    const puntosDeInteres = await em.find(
      PuntoDeInteres,
      { usuario: usuarioId },
      { populate: ["tags"] }
    );

    res.status(200).json({
      message: "Puntos de interés del usuario logeado",
      data: puntosDeInteres,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

async function esFavorito(req: Request, res: Response) {
  try {
    const usuarioId = req.user?.id;
    const puntoDeInteresId = Number.parseInt(req.params.id);
    if (!usuarioId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return; 
    }
    const puntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id: puntoDeInteresId }, { populate: ['favoritoDe'] });
    const esFavorito = puntoDeInteres.favoritoDe.getItems().some(user => user.id === usuarioId);
    res.status(200).json({ message: "Chequeo de favorito realizado", data: { esFavorito } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function addToFavoritos(req: Request, res: Response) {
  try {
    const usuarioId = req.user?.id;
    const puntoDeInteresId = req.body.id;
    if (!usuarioId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return; 
    }
    const puntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id: puntoDeInteresId }, { populate: ['favoritoDe'] });
    const yaEsFavorito = puntoDeInteres.favoritoDe.getItems().some(user => user.id === usuarioId);
    if (yaEsFavorito) {
      res.status(400).json({ message: "El punto de interés ya está en favoritos" });
      return
    } 
    const usuario = await em.findOneOrFail(Usuario, usuarioId)
    puntoDeInteres.favoritoDe.add(usuario);
    await em.flush();
    res.status(200).json({ message: "Punto de interés añadido a favoritos", data: puntoDeInteres });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function sacarDeFavoritos(req: Request, res: Response) {
  try {
    const usuarioId = req.user?.id;
    const puntoDeInteresId = req.body.id;

    if (!usuarioId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return
    }

    const usuario = await em.findOneOrFail(
      Usuario,
      { id: usuarioId },
      { populate: ['favoritos'] }
    );

    const puntoDeInteres = await em.findOneOrFail(PuntoDeInteres, { id: puntoDeInteresId });

    if (!usuario.favoritos.contains(puntoDeInteres)) {
      res.status(400).json({ message: "El punto de interés no está en favoritos" });
      return
    }
    usuario.favoritos.remove(puntoDeInteres);
    await em.flush();

    res.status(200).json({
      message: "Punto de interés eliminado de favoritos",
      data: puntoDeInteres.id 
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export { findAll, findOne, add, update, remove, filtro, getAllFromUsuarioLogeado, addToFavoritos, sacarDeFavoritos, esFavorito };