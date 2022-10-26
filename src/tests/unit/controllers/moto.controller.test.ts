import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { motoMock, motoMockId } from '../../mocks/motosMock';
import MotorModel from '../../../models/Motorcycle';
import MotorService from '../../../services/Motorcycle';
import MotorController from '../../../controllers/Motorcycle';

describe('Testes da camada Controller', () => {
  const MotoModel = new MotorModel();
  const Motoservice = new MotorService(MotoModel);
  const MotoController = new MotorController(Motoservice);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(Motoservice, 'create').resolves(motoMockId);
    sinon.stub(Motoservice, 'readOne').resolves(motoMockId);
    sinon.stub(Motoservice, 'read').resolves([motoMockId]);
    sinon.stub(Motoservice, 'update').resolves(motoMockId);
    sinon.stub(Motoservice, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Criando um Carro', () => {
    it('Criando com sucesso', async () => {
      req.body = motoMock;
      await MotoController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMockId)).to.be.true;
    });
  });

  describe('Pesquisando 1 Carro', () => {
    it('Pesquisando com sucesso', async () => {
      req.params = { id: motoMockId._id };
      await MotoController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMockId)).to.be.true;
    });
  });

  describe('Pesquisando Carros', () => {
    it('Pesquisando com sucesso', async () => {
      await MotoController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motoMockId])).to.be.true;
    });
  });

  describe('Atualizando um Carro', () => {
    it('Atualizando com sucesso', async () => {
      req.params = { id: motoMockId._id }
      req.body = motoMock
      await MotoController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMockId)).to.be.true;
    });
  });
    
  describe('Deletando um Carro', () => {
    it('Deletando com sucesso', async () => {
      req.params = { id: motoMockId._id }
      await MotoController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});