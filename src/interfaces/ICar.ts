import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'Doors Quantity is required',
    invalid_type_error: 'Doors Quantity must be a number',
  })
    .gte(2, { message: 'Doors Quantity must be greater or equal than 2' })
    .lte(4, { message: 'Doors Quantity must be less or equal than 4' })
    .int({ message: 'Doors Quantity must be an int value' })
    .positive(),

  seatsQty: z.number({
    required_error: 'Seats Quantity is required',
    invalid_type_error: 'Seats Quantity must be a number',
  })
    .gte(2, { message: 'Seats Quantity must be greater or equal than 2' })
    .lte(7, { message: 'Seats Quantity must be less or equal than 7' })
    .int({ message: 'Seats Quantity must be an int value' })
    .positive(),
});

export type ICar = z.infer<typeof carZodSchema>;
