import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/Cars';
import { Model } from 'mongoose';
import { carMock, carMockId } from '../../mocks/carsMock';
import { ICar } from '../../../interfaces/ICar';
const { expect } = chai;


describe('Testes da camada Model', () => {
  const CarMock = new CarsModel();
  const arrayCars = [carMockId];

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'findOne').resolves(carMockId);
    sinon.stub(Model, 'find').resolves([carMockId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Criando um Carro', () => {
    it('Criando com sucesso', async () => {
      const newCar = await CarMock.create(carMock);
      expect(newCar).to.be.deep.equal(carMockId);
    });
  });

  describe('Pesquisando 1 Carro', () => {
    it('Pesquisando com sucesso', async () => {
      const carFound = await CarMock.readOne('62cf1fc6498565d94eba52cd');
      expect(carFound).to.be.deep.equal(carMockId);
    });

    it('Pesquisa _id not found', async () => {
      try {
        await CarMock.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('Pesquisando Carros', () => {
    it('Pesquisa é um array', async () => {
      const carsFound = await CarMock.read();
      expect(carsFound).to.be.an('array');
    });

    it('Pesquisa contai o carro', async () => {
      const carsFound = await CarMock.read();
      carsFound?.forEach((item: ICar, index: number) => {
        expect(item).to.be.deep.equal(arrayCars[index]);
      });
    });
  });

  describe('Atualizando um Carro', () => {
    it('Atualizando com sucesso', async () => {
      const carAtt = await CarMock.update('62cf1fc6498565d94eba52cd', carMock)
      expect(carAtt).to.be.deep.equal(carMockId);
    });

    it('Atualizando _id not found', async () => {
      try {
        const carAtt = await CarMock.update('123ERRADO', carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('Deletando um Carro', () => {
    it('Deletando com sucesso', async () => {
      const carDel = await CarMock.delete('62cf1fc6498565d94eba52cd');
      expect(carDel).to.be.deep.equal(carMockId);
    });

    it('Deletando _id not found', async () => {
      try {
        await CarMock.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });
});
