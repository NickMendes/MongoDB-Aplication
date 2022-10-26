import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { carMock, carMockId } from '../../mocks/carsMock';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import CarsController from '../../../controllers/Cars';

describe('Testes da camada Controller', () => {
  const CarModel = new CarsModel();
  const CarService = new CarsService(CarModel);
  const CarController = new CarsController(CarService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(CarService, 'create').resolves(carMockId);
    sinon.stub(CarService, 'readOne').resolves(carMockId);
    sinon.stub(CarService, 'read').resolves([carMockId]);
    sinon.stub(CarService, 'update').resolves(carMockId);
    sinon.stub(CarService, 'delete').resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Criando um Carro', () => {
    it('Criando com sucesso', async () => {
      req.body = carMock;
      await CarController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    });
  });

  describe('Pesquisando 1 Carro', () => {
    it('Pesquisando com sucesso', async () => {
      req.params = { id: carMockId._id };
      await CarController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    });
  });

  describe('Pesquisando Carros', () => {
    it('Pesquisando com sucesso', async () => {
      await CarController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockId])).to.be.true;
    });
  });

  describe('Atualizando um Carro', () => {
    it('Atualizando com sucesso', async () => {
      req.params = { id: carMockId._id }
      req.body = carMock
      await CarController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    });
  });
    
  describe('Deletando um Carro', () => {
    it('Deletando com sucesso', async () => {
      req.params = { id: carMockId._id }
      await CarController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});