import { loaderConfig } from './config/loader-config';
import { getConnection } from './database/mongo';
import { getGames } from './services/games/games-fetch';
import { GameResponse } from './types/game.type';

console.log('Service started');

getConnection(loaderConfig.MONGO_URI, loaderConfig.DB_NAME, loaderConfig.DB_USER, loaderConfig.DB_PASS);


getGames().then(games => {
  let playedGames: GameResponse[] = new Array<GameResponse>();
  let unplayedGames: GameResponse[] = new Array<GameResponse>();

  games.forEach(game => {
    if(game.setResults[1] != null){
      playedGames.push(game);
    } else {
      unplayedGames.push(game);
    }
  })

  console.log("Played Games: ", playedGames.length)
  console.log("Unplayed Games: ", unplayedGames.length)
});

