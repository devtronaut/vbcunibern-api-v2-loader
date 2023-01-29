import { loaderConfig } from "./config/loader-config";
import { getConnection } from "./persistence/mongo";

console.log("Hello World");

getConnection(loaderConfig.MONGO_URI)
  .then(() => console.log('Success'))
  .catch((error) => console.log('Failure', error));


