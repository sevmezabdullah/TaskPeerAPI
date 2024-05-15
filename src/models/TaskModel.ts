import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '../utils/commonValidation';


extendZodWithOpenApi(z);

export type Task = z.infer<typeof TaskSchema>;
export const TaskSchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    reminderAt: z.date(),
    isRoutine: z.boolean(),
    taskTitle: z.string(),
    task: z.string(),
    audioSource: z.string().nullable(),
    isDone: z.boolean(),
    isDoneDate: z.date().nullable(),
    deletedDate: z.date().nullable(),
    isActive: z.boolean(),
    userId: z.number(),
    categoryId: z.number(),
    routineFrequency: z.array(z.string()),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});