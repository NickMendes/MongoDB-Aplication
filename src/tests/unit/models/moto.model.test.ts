import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motoMock, motoMockId } from '../../mocks/motosMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;


describe('Testes da camada Model', () => {
  const MotoModel = new MotorcycleModel();
  const arrayMotos = [motoMockId];

  before(async () => {
    sinon.stub(Model, 'create').resolves(motoMockId);
    sinon.stub(Model, 'findOne').resolves(motoMockId);
    sinon.stub(Model, 'find').resolves([motoMockId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoMockId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motoMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Criando um Carro', () => {
    it('Criando com sucesso', async () => {
      const newCar = await MotoModel.create(motoMock);
      expect(newCar).to.be.deep.equal(motoMockId);
    });
  });

  describe('Pesquisando 1 Carro', () => {
    it('Pesquisando com sucesso', async () => {
      const carFound = await MotoModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carFound).to.be.deep.equal(motoMockId);
    });

    it('Pesquisa _id not found', async () => {
      try {
        await MotoModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('Pesquisando Carros', () => {
    it('Pesquisa é um array', async () => {
      const carsFound = await MotoModel.read();
      expect(carsFound).to.be.an('array');
    });

    it('Pesquisa contai o carro', async () => {
      const carsFound = await MotoModel.read();
      carsFound?.forEach((item: IMotorcycle, index: number) => {
        expect(item).to.be.deep.equal(arrayMotos[index]);
      });
    });
  });

  describe('Atualizando um Carro', () => {
    it('Atualizando com sucesso', async () => {
      const carAtt = await MotoModel.update('62cf1fc6498565d94eba52cd', motoMock)
      expect(carAtt).to.be.deep.equal(motoMockId);
    });

    it('Atualizando _id not found', async () => {
      try {
        const carAtt = await MotoModel.update('123ERRADO', motoMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('Deletando um Carro', () => {
    it('Deletando com sucesso', async () => {
      const carDel = await MotoModel.delete('62cf1fc6498565d94eba52cd');
      expect(carDel).to.be.deep.equal(motoMockId);
    });

    it('Deletando _id not found', async () => {
      try {
        await MotoModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });
});
