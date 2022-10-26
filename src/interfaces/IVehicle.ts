import { z } from 'zod';

export const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { message: 'Model must be at least 3 characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  })
    .gte(1900, { message: 'Year must be greater or equal than 1900' })
    .lte(2022, { message: 'Year must be less or equal than 2022' })
    .int({ message: 'Year must be an int value' })
    .positive(),
  
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  })
    .min(3, { message: 'Color must be at least 3 characters long' }),

  status: z.boolean({
    invalid_type_error: 'Status must be a boolean',
  })
    .optional(),

  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  })
    .int({ message: 'Buy Value must be an int value' })
    .positive(),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;
