type LoaderEnvs = {
  NODE_ENV: string,
  MONGO_URI: string,
  MONGO_URI_DEV: string
}

type LoaderConfig = {
  NODE_ENV: string,
  MONGO_URI: string
}

export {LoaderEnvs, LoaderConfig}