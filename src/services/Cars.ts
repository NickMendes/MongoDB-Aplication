import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarsService implements IService<ICar> {
  private _cars:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._cars.create(parsed.data);
  }

  public async read():Promise<ICar[]> {
    const cars = await this._cars.read();
    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    if (_id.length !== 24) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._cars.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const car = await this._cars.update(_id, parsed.data);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    
    return car;
  }

  public async delete(_id: string): Promise<ICar> {
    const car = await this._cars.delete(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }
}

export default CarsService;
