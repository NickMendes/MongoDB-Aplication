import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),

  engineCapacity: z.number({
    required_error: 'Engine Capacity is required',
    invalid_type_error: 'Engine Capacity must be a number',
  })
    .lte(2500, { message: 'Engine Capacity must be less or equal than 2500' })
    .int({ message: 'Engine Capacity must be an int value' })
    .positive(),
});

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
