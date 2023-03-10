interface LoaderConfig {
  NODE_ENV: string,
  MONGO_URI: string,
  DB_NAME: string,
  GAMES_COLLECTION: string,
  DB_USER: string,
  DB_PASS: string
}

interface LoaderEnvs extends LoaderConfig{
  MONGO_URI_DEV: string,
  DB_USER_DEV: string,
  DB_PASS_DEV: string
}

export {LoaderEnvs, LoaderConfig}