import { Response, Request } from 'express';
import { orm } from '../shared/db/orm.js';
import { Usuario } from './usuario.entity.js';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../shared/config.js';
import { PuntoDeInteres } from '../puntoDeInteres/puntoDeInteres.entity.js';

const em = orm.em;

export class UsuarioController {
  private async validarCamposUnicos(
    { nombre, gmail, cuit }: { nombre?: string; gmail?: string; cuit?: string },
    excludeId?: number
  ): Promise<string[]> {
    const errores: string[] = [];

    if (nombre) {
      const existe = await em.findOne(Usuario, { nombre });
      if (existe && existe.id !== excludeId)
        errores.push(`Ya existe un usuario con el nombre '${nombre}'`);
    }
    if (gmail) {
      const existe = await em.findOne(Usuario, { gmail });
      if (existe && existe.id !== excludeId)
        errores.push(`Ya existe un usuario con el gmail '${gmail}'`);
    }
    if (cuit) {
      const existe = await em.findOne(Usuario, { cuit });
      if (existe && existe.id !== excludeId)
        errores.push(`Ya existe un usuario con el CUIT '${cuit}'`);
    }

    return errores;
  }

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const usuarios = await em.find(
        Usuario,
        {},
        {
          populate: [
            'localidad',
            'localidad.provincia',
            'puntosDeInteres',
            'favoritos',
            'agendaEvento',
            'valoraciones',
          ],
        }
      );
      res.status(200).json({ message: 'Usuarios found', data: usuarios });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching usuarios', error: error.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const usuario = await em.findOneOrFail(Usuario, id, {
        populate: [
          'localidad',
          'localidad.provincia',
          'puntosDeInteres',
          'favoritos',
          'agendaEvento',
          'valoraciones',
        ],
      });
      res.status(200).json({ message: 'Usuario found', data: usuario });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching usuario', error: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { nombre, tipo, gmail, password, cuit } = req.body;

      const errores = await this.validarCamposUnicos({ nombre, gmail, cuit });
      if (errores.length > 0) {
        res.status(409).json({ message: 'Datos duplicados', errors: errores });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, config.jwt.saltRounds);
      const newUser = em.create(Usuario, { nombre, tipo, gmail, cuit, password: hashedPassword });
      await em.persistAndFlush(newUser);
      res.status(201).json({ message: 'Usuario added successfully', data: newUser });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res.status(409).json({ message: 'Ya existe un usuario con esos datos' });
        return;
      }
      res.status(500).json({ message: 'Error adding usuario', error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const { nombre, gmail, cuit, password } = req.body;

      const errores = await this.validarCamposUnicos({ nombre, gmail, cuit }, id);
      if (errores.length > 0) {
        res.status(409).json({ message: 'Datos duplicados', errors: errores });
        return;
      }

      if (password) {
        req.body.password = bcrypt.hashSync(password, config.jwt.saltRounds);
      }

      const usuario = await em.findOneOrFail(Usuario, id);
      em.assign(usuario, req.body);
      await em.flush();
      res.status(200).json({ message: 'Usuario updated successfully', data: usuario });
    } catch (error: any) {
      if (error instanceof UniqueConstraintViolationException) {
        res.status(409).json({ message: 'Ya existe un usuario con esos datos' });
        return;
      }
      res.status(500).json({ message: 'Error updating usuario', error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { gmail, password } = req.body;
      if (!gmail || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const em = orm.em.fork();
      const user = await em.findOne(Usuario, { gmail });
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      const publicUser = {
        nombre: user.nombre,
        tipo: user.tipo,
        gmail: user.gmail,
      };

      const accessToken = jwt.sign(
        { id: user.id, gmail: user.gmail, tipo: user.tipo },
        config.jwt.accessSecret,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { id: user.id, gmail: user.gmail, tipo: user.tipo },
        config.jwt.refreshSecret,
        { expiresIn: '7D' }
      );

      res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000, // -> 15 minutos
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        })
        .status(200)
        .json({ message: 'Login successful', user: publicUser });
    } catch (error: any) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token required' });
        return;
      }

      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as jwt.JwtPayload;

      const newAccessToken = jwt.sign(
        { id: decoded.id, gmail: decoded.gmail, tipo: decoded.tipo },
        config.jwt.accessSecret,
        { expiresIn: '15m' }
      );

      res
        .cookie('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 15 * 60 * 1000, // -> 15 minutos
        })
        .status(200)
        .json({ message: 'Token refreshed successfully' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    res
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .status(200)
      .json({ message: 'Logout successful' });
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const usuario = await em.findOneOrFail(
        Usuario,
        { id },
        { populate: ['favoritos', 'agendaEvento', 'valoraciones'] }
      );

      usuario.favoritos.removeAll();
      usuario.agendaEvento.removeAll();

      for (const valoracion of usuario.valoraciones) {
        em.remove(valoracion);
      }

      await em.flush();
      await em.removeAndFlush(usuario);

      res.status(200).json({ message: 'Usuario removed successfully', data: id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  isAdmin = async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.tipo) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const isAdmin = req.user.tipo === 'admin';
      isAdmin
        ? res.status(200).json({ message: 'User is admin', isAdmin: true })
        : res.status(401).json({ message: 'User is not admin', isAdmin: false });
    } catch (error: any) {
      res.status(500).json({ message: 'Error checking admin status', error: error.message });
    }
  };

  isCreator = async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.tipo) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const isCreator = req.user.tipo === 'creador';
      isCreator
        ? res.status(200).json({ message: 'User is creator', isCreator: true })
        : res.status(401).json({ message: 'User is not creator', isCreator: false });
    } catch (error: any) {
      res.status(500).json({ message: 'Error checking creator status', error: error.message });
    }
  };

  getCurrentUser = async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Token Invalido o Expirado' });
        return;
      }
      const usuarioId = req.user.id;
      const usuario = await em.findOneOrFail(Usuario, usuarioId, {
        populate: [
          'localidad',
          'localidad.provincia',
          'puntosDeInteres',
          'favoritos',
          'agendaEvento',
        ],
      });
      res.status(200).json({ message: 'Usuario Found', data: usuario });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching current user', error: error.message });
    }
  };

  isPdiOwner = async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.tipo) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const id = Number.parseInt(req.params.id);
      const pdi = await em.findOneOrFail(PuntoDeInteres, { id }, { populate: ['usuario'] });

      const isOwner = req.user.id === pdi.usuario.id;
      isOwner
        ? res.status(200).json({ message: 'User is owner of PDI', isOwner: true })
        : res.status(401).json({ message: 'User is not owner of PDI', isOwner: false });
    } catch (error: any) {
      res.status(500).json({ message: 'Error checking admin status', error: error.message });
    }
  };
}
