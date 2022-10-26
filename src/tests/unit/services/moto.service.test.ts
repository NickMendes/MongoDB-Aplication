import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorModel from '../../../models/Motorcycle';
import MotorService from '../../../services/Motorcycle';
import { motoMock, motoMockId } from '../../mocks/motosMock';

describe('Testes da camada Service', () => {
  const MotoModel = new MotorModel();
  const MotoService = new MotorService(MotoModel);
  const arrayCars = [motoMockId];

  before(async () => {
    sinon.stub(MotoModel, 'create').resolves(motoMockId);
    sinon.stub(MotoModel, 'readOne')
      .onCall(0).resolves(motoMockId)
      .onCall(1).resolves(null);
    sinon.stub(MotoModel, 'read').resolves([motoMockId]);
    sinon.stub(MotoModel, 'update').resolves(motoMockId)
      .onCall(0).resolves(motoMockId)
      .onCall(1).resolves(null);
    sinon.stub(MotoModel, 'delete')
      .onCall(0).resolves(motoMockId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });
  
  describe('Criando um Carro', () => {
    it('Criando com sucesso', async () => {
      const newCar = await MotoService.create(motoMock);
      expect(newCar).to.be.deep.equal(motoMockId);
    });

    it('Falha', async () => {
      let error;
      try {
        await MotoService.create({ });
      } catch (err) {
        error = err
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Pesquisando 1 Carro', () => {
    it('Pesquisando com sucesso', async () => {
      const carFound = await MotoService.readOne(motoMockId._id);
      expect(carFound).to.be.deep.equal(motoMockId);
    });

    it('Falha _id 24', async () => {
      let error: any;
      try {
      await MotoService.readOne(motoMockId._id);
      }  catch (err) {
        error = err
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });

    it('Falha _id < 24', async () => {
      let error: any;
      try {
      await MotoService.readOne('12345690129029');
      }  catch (err) {
        error = err
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });

  });

  describe('Pesquisando Carros', () => {
    it('Pesquisando com sucesso', async () => {
      const carsFound = await MotoService.read();
      expect(carsFound).to.be.deep.equal(arrayCars); 
    });
  });

  describe('Atualizando um Carro', () => {
    it('Atualizando com sucesso', async () => {
      const carAtt = await MotoService.update('62cf1fc6498565d94eba52cd', motoMock)
      expect(carAtt).to.be.deep.equal(motoMockId);
    });

    it('Falha - _id not found', async () => {
      let error: any;
      try {
        await MotoService.update('62cf1fc6498565d94eba52cd', motoMock);
      }  catch (err) {
        error = err
      }
      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound);
    });

    it('Falha - Zod', async () => {
      let error;
      try {
        await MotoService.update('62cf1fc6498565d94eba52cd', { INVALID: "OBJECT" });
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Deletando um Carro', () => {
    it('Deletando com sucesso', async () => {
      const carDel = await MotoService.delete(motoMockId._id);
      expect(carDel).to.be.deep.equal(motoMockId);
    });

    it('Falha', async () => {
      let error;
      try {
        await MotoService.delete(motoMockId._id);
      } catch (err: any) {
        error = err
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });
});