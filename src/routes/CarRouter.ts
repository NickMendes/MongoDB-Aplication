import { Router } from 'express';
import CarsController from '../controllers/Cars';
import CarsService from '../services/Cars';
import CarsModel from '../models/Cars';

const carRoute = Router();

const cars = new CarsModel();
const carsService = new CarsService(cars);
const carsController = new CarsController(carsService);

carRoute.post('', (req, res) => carsController.create(req, res));
carRoute.get('', (req, res) => carsController.read(req, res));
carRoute.get('/:id', (req, res) => carsController.readOne(req, res));
carRoute.put('/:id', (req, res) => carsController.update(req, res));
carRoute.delete('/:id', (req, res) => carsController.delete(req, res));

export default carRoute;
