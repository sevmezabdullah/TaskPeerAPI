import express, { Express } from 'express';
import 'reflect-metadata';


import cors from 'cors';
import pino from 'pino';
import { envConfig } from './utils/envConfig';
import helmet from 'helmet';
import rateLimiter from './middleware/rateLimiter';
import requestLogger from './middleware/requestLogger';
import { healthCheckRouter } from './routes/healthCheck';
import { openAPIRouter } from './docs/openApiRouter';
import errorHandler from './middleware/errorHandler';
import userRouter from './routes/userRouter';
const logger = pino({ name: 'Server Started' })




const app: Express = express();
app.set('trust proxy', true);
app.use(express.json());

app.use(cors({ origin: envConfig.CORS_ORIGIN, credentials: true }))
app.use(helmet());
app.use(rateLimiter)

app.use(requestLogger())
//Routes
app.use('/health-check', healthCheckRouter)
app.use('/api', userRouter)



app.use(openAPIRouter)

app.use(errorHandler)



export { logger, app }