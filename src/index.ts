import { loaderConfig } from './config/loader-config';
import { getConnection } from './database/mongo';

console.log('Hello World');

getConnection(loaderConfig.MONGO_URI, loaderConfig.DB_NAME, loaderConfig.DB_USER, loaderConfig.DB_PASS);


