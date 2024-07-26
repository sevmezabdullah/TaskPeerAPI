import dotenv from 'dotenv';

import { cleanEnv, host, num, port, str } from 'envalid'
dotenv.config({ path: '.env' });

export const envConfig = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
    PORT: port(),
    HOST: host(),
    DB_PORT: num(),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    JWT_SECRET: str(),
    CORS_ORIGIN: str(),
    COMMON_RATE_LIMIT_MAX_REQUESTS: num(),
    COMMON_RATE_LIMIT_WINDOW_MS: num(),
    DB_URL: str(),
    EMAIL_HOST: str(),
    EMAIL_PORT: str(),
    EMAIL_USER: str(),
    EMAIL_PASSWORD: str(),
    EMAIL_FROM: str(),
    EMAIL_SECURE: str(),
    EMAIL_SERVICE: str(),
    API_PREFIX: str(),
    PAGE_PREFIX: str(),
    HOSTING_URL: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),

});