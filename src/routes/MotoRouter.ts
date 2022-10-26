import { Router } from 'express';
import MotorcyclesController from '../controllers/Motorcycle';
import MotorcyclesService from '../services/Motorcycle';
import MotorcyclesModel from '../models/Motorcycle';

const motorcycleRoute = Router();

const motorcycles = new MotorcyclesModel();
const motorcyclesService = new MotorcyclesService(motorcycles);
const motorcyclesController = new MotorcyclesController(motorcyclesService);

motorcycleRoute.post('', (req, res) => motorcyclesController.create(req, res));
motorcycleRoute.get('', (req, res) => motorcyclesController.read(req, res));
motorcycleRoute.get('/:id', (req, res) => motorcyclesController.readOne(req, res));
motorcycleRoute.put('/:id', (req, res) => motorcyclesController.update(req, res));
motorcycleRoute.delete('/:id', (req, res) => motorcyclesController.delete(req, res));

export default motorcycleRoute;
