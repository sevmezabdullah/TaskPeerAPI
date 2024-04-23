import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '../utils/commonValidation';

extendZodWithOpenApi(z);

export type Category = z.infer<typeof CategorySchema>;
export const CategorySchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    title: z.string(),
    color: z.string(),
    emoji: z.string().optional(),
    userId: z.number(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});