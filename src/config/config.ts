import * as dotenv from 'dotenv';
import { LoaderConfig } from '../types/config.type';
import { getValidatedConfig } from './loader-config';

dotenv.config();

const envVars: LoaderConfig = getValidatedConfig();
const isProd: boolean = envVars.NODE_ENV === 'production';

export const NODE_ENV = envVars.NODE_ENV;
export const MONGO_URI = isProd? envVars.MONGO_URI : envVars.MONGO_URI_DEV;
