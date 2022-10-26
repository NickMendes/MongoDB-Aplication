import { ICar } from "../../interfaces/ICar";

const carMock:ICar = {
  model: 'Ford Ka',
  year: 2020,
  color: 'gray',
  status: true,
  buyValue: 30000,
  doorsQty: 4,
  seatsQty: 5,
}

const carMockId:ICar & { _id:string }= {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Ford Ka',
  year: 2020,
  color: 'gray',
  status: true,
  buyValue: 30000,
  doorsQty: 4,
  seatsQty: 5,
}

export { carMock, carMockId };
