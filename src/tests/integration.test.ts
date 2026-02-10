import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { orm } from '../shared/db/orm.js';
import { Usuario } from '../usuario/usuario.entity.js';

describe('Integracion: Puntos de Interés', () => {
  
  it('debería retornar una lista de puntos de interés con status 200', async () => {
    const res = await request(app)
      .get('/api/puntosDeInteres')
      .expect('Content-Type', /json/);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });
});

describe('Integracion: Gestion de Usuarios', () => {
  const testUser = {
    nombre: 'Test UTN',
    tipo: 'admin',
    gmail: 'tester@utn.edu.ar',
    password: 'Password123!'
  };

  let authCookies: any;

  after(async () => {
    const em = orm.em.fork();
    
    const usuarioABorrar = await em.findOne(Usuario, { gmail: testUser.gmail });
    
    if (usuarioABorrar) {
      await em.removeAndFlush(usuarioABorrar);
      console.log(`Usuario ${testUser.gmail} eliminado satisfactoriamente.`);
    }

    await orm.close();
  });

  before(async () => {
    const em = orm.em.fork();
    const existing = await em.findOne(Usuario, { gmail: testUser.gmail });
    if (existing) {
      await em.removeAndFlush(existing);
    }
  });

  it('debería registrar un nuevo usuario exitosamente (status 201)', async () => {
    const res = await request(app)
      .post('/api/usuarios/register')
      .send(testUser);

    expect(res.status).to.equal(201);
    expect(res.body.data).to.have.property('gmail', testUser.gmail);
  });

  it('debería loguearse y recibir cookies de access y refresh (status 200)', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({
        gmail: testUser.gmail,
        password: testUser.password
      });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Login successful');
    
    authCookies = res.header['set-cookie'];
    expect(authCookies).to.have.lengthOf(2); 
  });

  it('debería obtener los datos del usuario actual usando las cookies', async () => {
    const res = await request(app)
      .get('/api/usuarios/currentUser') 
      .set('Cookie', authCookies);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property('nombre', testUser.nombre);
    expect(res.body.data).to.have.property('puntosDeInteres');
  });

  it('debería limpiar las cookies al hacer logout', async () => {
    const res = await request(app).post('/api/usuarios/logout');

    expect(res.status).to.equal(200);
    const rawCookies = res.header['set-cookie'];
    const cookies = Array.isArray(rawCookies) ? rawCookies.join('; ') : (rawCookies || '');
    expect(cookies).to.contain('access_token=;');
    expect(cookies).to.contain('refresh_token=;');
  });
});