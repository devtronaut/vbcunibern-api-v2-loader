import * as dotenv from 'dotenv';
import { LoaderConfig, LoaderEnvs } from '../types/config.type';
import { getValidatedConfig } from './loader-config.validator';

dotenv.config();

const envVars: LoaderEnvs = getValidatedConfig();
const isProd: boolean = envVars.NODE_ENV === 'production';

const loaderConfig: LoaderConfig = {
  NODE_ENV: envVars.NODE_ENV,
  MONGO_URI: isProd? envVars.MONGO_URI : envVars.MONGO_URI_DEV
}

export {loaderConfig}
