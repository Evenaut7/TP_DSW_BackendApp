import { expect } from 'chai';
import sinon from 'sinon';
import { UsuarioController } from '../usuario/usuario.controller.js';
import { PuntoDeInteresController } from '../puntoDeInteres/puntoDeInteres.controller.js';
import { orm } from '../shared/db/orm.js';

describe('Unit Tests: PuntoDeInteresController', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let pdiController: PuntoDeInteresController;

  before(() => {
    pdiController = new PuntoDeInteresController();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    
    req = { params: {}, body: {}, user: {} };
    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy() 
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Test con Stub: debería retornar 200 si el creador tiene puntos de interés', async () => {
    const fakePdis = [{ id: 1, nombre: 'Parque Independencia' }];
    
    const findStub = sandbox.stub(orm.em, 'find').resolves(fakePdis);

    req.user = { id: 10, tipo: 'creador' };

    await pdiController.getAllFromUsuarioLogeado(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(sinon.match({ data: fakePdis }))).to.be.true;
    expect(findStub.calledOnce).to.be.true; 
  });

  it('Test con Spy: debería denegar acceso (403) a usuarios que no son admin/creador', async () => {
    req.user = { id: 5, tipo: 'usuario' };

    await pdiController.getAllFromUsuarioLogeado(req, res);

    expect(res.status.calledWith(403)).to.be.true;
    
    const responseBody = res.json.firstCall.args[0];
    expect(responseBody.message).to.equal("Acceso denegado: usuario no es del tipo admin o creador");
  });

  it('Test con Mock: debería persistir y sincronizar (flush) al agregar un PDI', async () => {
    const emMock = sandbox.mock(orm.em);
    
    emMock.expects('flush').once().resolves();
    
    sandbox.stub(orm.em, 'create').returns({ id: 99 } as any);

    req.body = { nombre: 'Nuevo Punto UTN', localidad: 1 };

    await pdiController.add(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    
    emMock.verify();
  });
});

describe('Unit Test: UsuarioController - isAdmin', () => {
  let controller: UsuarioController;
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;

  before(() => {
    controller = new UsuarioController();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    
    req = { params: {}, body: {}, user: {} };
    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.spy() 
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('debería responder 200 si el usuario es admin', async () => {
    const req = {
      user: { tipo: 'admin' }
    } as any;

    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub()
    } as any;

    await controller.isAdmin(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(sinon.match({ isAdmin: true }))).to.be.true;
  });

  it('debería responder 401 si el usuario NO es admin', async () => {
    const req = {
      user: { tipo: 'creador' }
    } as any;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    } as any;

    await controller.isAdmin(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith(sinon.match({ isAdmin: false }))).to.be.true;
  });
});

