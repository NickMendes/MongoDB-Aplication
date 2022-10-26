import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: {
    type: Boolean,
    required: false,
  },
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarsModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carMongooseSchema)) {
    super(model);
  }
}

export default CarsModel;
