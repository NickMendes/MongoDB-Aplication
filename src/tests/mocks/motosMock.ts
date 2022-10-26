import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motoMock:IMotorcycle = {
  model: 'Motoca',
  year: 2021,
  color: 'azul',
  status: true,
  buyValue: 30000,
  category: 'Street',
  engineCapacity: 2000
}

const motoMockId:IMotorcycle & { _id:string }= {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Motoca',
  year: 2021,
  color: 'azul',
  status: true,
  buyValue: 30000,
  category: 'Street',
  engineCapacity: 2000
}

export { motoMock, motoMockId };
