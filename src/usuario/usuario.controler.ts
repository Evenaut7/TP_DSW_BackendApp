import { Response, Request } from 'express';
import { orm } from '../shared/db/orm.js';
import { Usuario } from './usuario.entity.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../shared/config.js';

const em = orm.em;

export class UsuarioController {
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
            'agendaPDI',
            'valoraciones',
          ],
        }
      );
      res.status(200).json({ message: 'Usuarios found', data: usuarios });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error fetching usuarios', error: error.message });
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
          'agendaPDI',
          'valoraciones',
        ],
      });
      res.status(200).json({ message: 'Usuario found', data: usuario });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error fetching usuario', error: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { nombre, tipo, gmail, password } = req.body;

      // Unicidad de gmail y nombre y CUIT
      const existingGmail = await em.findOne(Usuario, { gmail });
      if (existingGmail) {
        res
          .status(409)
          .json({ message: 'Usuario with this gmail already exists' });
        return;
      }
      const existingNombre = await em.findOne(Usuario, { nombre });
      if (existingNombre) {
        res
          .status(409)
          .json({ message: 'Usuario with this nombre already exists' });
        return;
      }
      // Hasheo de Contraseña
      const hashedPassword = await bcrypt.hashSync(password, config.jwt.saltRounds);
      //const ok = await bcrypt.compare(password, hashedPassword);

      const newUser = new Usuario();
      newUser.nombre = nombre;
      newUser.tipo = tipo;
      newUser.gmail = gmail;
      newUser.password = hashedPassword;

      await em.persistAndFlush(newUser);
      res
        .status(201)
        .json({ message: 'Usuario added successfully', data: newUser });
      return;
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error adding usuario', error: error.message });
      return;
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
      res
        .status(500)
        .json({ message: 'Error logging in', error: error.message });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token required' });
        return;
      }

      const decoded = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret
      ) as jwt.JwtPayload;

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
      res
        .status(500)
        .json({ message: 'Error refreshing token', error: error.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    res
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .status(200)
      .json({ message: 'Logout successful' });
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const { nombre, gmail, cuit } = req.body;

      // Unicidad de gmail y nombre y CUIT

      const existingGmail = await em.findOne(Usuario, { gmail });
      if (existingGmail && existingGmail.id !== id) {
        res
          .status(409)
          .json({ message: 'Usuario with this gmail already exists' });
        return;
      }
      const existingNombre = await em.findOne(Usuario, { nombre });
      if (existingNombre && existingNombre.id !== id) {
        res
          .status(409)
          .json({ message: 'Usuario with this nombre already exists' });
        return;
      }
      const existingCUIT = await em.findOne(Usuario, { cuit });
      if (existingCUIT && existingCUIT.id !== id) {
        res
          .status(409)
          .json({ message: 'Usuario with this CUIT already exists' });
        return;
      }

      const usuario = await em.findOneOrFail(Usuario, id);
      em.assign(usuario, req.body);
      await em.flush();
      res
        .status(200)
        .json({ message: 'Usuario updated successfully', data: usuario });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error updating usuario', error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const usuarioToRemove = em.getReference(Usuario, id);
      await em.removeAndFlush(usuarioToRemove);
      res.status(200).json({
        message: 'Usuario removed successfully',
        data: usuarioToRemove,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error removing usuario', error: error.message });
    }
  };

  isAdmin = async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.tipo) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const isAdmin = req.user.tipo === 'admin';
      isAdmin
        ? res.status(200).json({ message: 'User is admin', isAdmin: true })
        : res
            .status(401)
            .json({ message: 'User is not admin', isAdmin: false });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error checking admin status', error: error.message });
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
          'agendaPDI',
        ],
      });
      res.status(200).json({ message: 'Usuario Found', data: usuario });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Error fetching current user', error: error.message });
    }
  };
}
