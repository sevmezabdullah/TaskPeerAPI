import { envConfig } from './utils/envConfig';
import { app, logger } from './server';
import { v2 as cloudinary } from 'cloudinary';
const server = app.listen(envConfig.PORT, () => {
    const { NODE_ENV, HOST, PORT } = envConfig;
    logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});



cloudinary.config({
    cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
    api_key: envConfig.CLOUDINARY_API_KEY,
    api_secret: envConfig.CLOUDINARY_API_SECRET,
});

const onCloseSignal = () => {
    logger.info('sigint received, shutting down');
    server.close(() => {
        logger.info('server closed');
        process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);