import Joi from 'joi';
import { LoaderEnvs } from '../types/config.type';

const nodeEnvValidator = Joi.string().valid('production', 'development', 'test').required();

const dbConnectionPattern = /^(mongodb:\/\/).*$/;
const dbConnectionValidator = Joi.string().regex(dbConnectionPattern);

const envVarsSchema: Joi.ObjectSchema<LoaderEnvs> = Joi.object()
  .keys({
   NODE_ENV: nodeEnvValidator,
   MONGO_URI: dbConnectionValidator, 
   MONGO_URI_DEV: dbConnectionValidator
  }).unknown();

function getValidatedConfig(): LoaderEnvs {
  const {value: envVars, error } = envVarsSchema
    .prefs({errors: {label: 'key'}})
    .validate(process.env);

  if(error){
    throw new Error(`Config validation error: ${error.message}`)
  }

  return envVars;
}

export {getValidatedConfig}

