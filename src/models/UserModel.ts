import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '../utils/commonValidation';

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    email: z.string().email(),
    password: z.string(),
    deviceToken: z.string(),
    isVerified: z.boolean(),
    isActive: z.boolean(),
    isPremium: z.boolean(),
    premiumStartDate: z.date().nullable(),
    avatar: z.string(),
    role: z.number(),

});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});