import * as dotenv from 'dotenv';
import { LoaderConfig, LoaderEnvs } from '../types/config.type';
import { getValidatedConfig } from './loader-config.validator';

dotenv.config();

const envVars: LoaderEnvs = getValidatedConfig();
const isProd: boolean = envVars.NODE_ENV === 'production';

const loaderConfig: LoaderConfig = {
  NODE_ENV: envVars.NODE_ENV,
  MONGO_URI: isProd? envVars.MONGO_URI : envVars.MONGO_URI_DEV,
  DB_NAME: envVars.DB_NAME,
  DB_USER: isProd? envVars.DB_USER : envVars.DB_USER_DEV,
  DB_PASS: isProd? envVars.DB_PASS : envVars.DB_PASS_DEV,
  GAMES_COLLECTION: envVars.GAMES_COLLECTION,
  API_GAMES_ENDPOINT: envVars.API_GAMES_ENDPOINT,
  API_RANKINGS_ENDPOINT: envVars.API_RANKINGS_ENDPOINT,
  API_KEY: envVars.API_KEY
}

export {loaderConfig}
