import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { carMock, carMockId } from '../../mocks/carsMock';

describe('Testes da camada Service', () => {
  const CarModel = new CarsModel();
  const CarService = new CarsService(CarModel);
  const arrayCars = [carMockId];

  before(async () => {
    sinon.stub(CarModel, 'create').resolves(carMockId);
    sinon.stub(CarModel, 'readOne')
      .onCall(0).resolves(carMockId)
      .onCall(1).resolves(null);
    sinon.stub(CarModel, 'read').resolves([carMockId]);
    sinon.stub(CarModel, 'update').resolves(carMockId)
      .onCall(0).resolves(carMockId)
      .onCall(1).resolves(null);
    sinon.stub(CarModel, 'delete')
      .onCall(0).resolves(carMockId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });
  
  describe('Criando um Carro', () => {
    it('Criando com sucesso', async () => {
      const newCar = await CarService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId);
    });

    it('Falha', async () => {
      let error;
      try {
        await CarService.create({ });
      } catch (err) {
        error = err
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Pesquisando 1 Carro', () => {
    it('Pesquisando com sucesso', async () => {
      const carFound = await CarService.readOne(carMockId._id);
      expect(carFound).to.be.deep.equal(carMockId);
    });

    it('Falha 24', async () => {
      let error: any;
      try {
      await CarService.readOne(carMockId._id);
      }  catch (err) {
        error = err
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });

    it('Falha < 24', async () => {
      let error: any;
      try {
      await CarService.readOne('12345690129029');
      }  catch (err) {
        error = err
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('Pesquisando Carros', () => {
    it('Pesquisando com sucesso', async () => {
      const carsFound = await CarService.read();
      expect(carsFound).to.be.deep.equal(arrayCars); 
    });
  });

  describe('Atualizando um Carro', () => {
    it('Atualizando com sucesso', async () => {
      const carAtt = await CarService.update('62cf1fc6498565d94eba52cd', carMock)
      expect(carAtt).to.be.deep.equal(carMockId);
    });

    it('Falha - _id not found', async () => {
      let error: any;
      try {
        await CarService.update('62cf1fc6498565d94eba52cd', carMock);
      }  catch (err) {
        error = err
      }
      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound);
    });

    it('Falha - Zod', async () => {
      let error;
      try {
        await CarService.update('62cf1fc6498565d94eba52cd', { INVALID: "OBJECT" });
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Deletando um Carro', () => {
    it('Deletando com sucesso', async () => {
      const carDel = await CarService.delete(carMockId._id);
      expect(carDel).to.be.deep.equal(carMockId);
    });

    it('Falha', async () => {
      let error;
      try {
        await CarService.delete(carMockId._id);
      } catch (err: any) {
        error = err
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });
});