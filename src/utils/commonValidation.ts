import { z } from 'zod';

export const commonValidations = {
    id: z
        .string()
        .refine((data) => !isNaN(Number(data)), 'ID Sayı olmalıdır')
        .transform(Number)
        .refine((num) => num > 0, 'ID Pozitif olmalıdır'),
    // ... other common validations
};