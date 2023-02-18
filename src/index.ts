import { loaderConfig } from './config/loader-config';
import { getConnection } from './database/mongo';
import { ResultsExtractionService } from './services/extraction/results-extraction.service';

console.log('Service started');

getConnection(loaderConfig.MONGO_URI, loaderConfig.DB_NAME, loaderConfig.DB_USER, loaderConfig.DB_PASS);

const resultsExtractionService = new ResultsExtractionService()
console.log("Played Games: ", resultsExtractionService.getGameResults().length)

