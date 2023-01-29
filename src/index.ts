import { loaderConfig } from './config/loader-config';
import { getConnection } from './database/mongo';

console.log('Service started');

getConnection(loaderConfig.MONGO_URI, loaderConfig.DB_NAME, loaderConfig.DB_USER, loaderConfig.DB_PASS);




