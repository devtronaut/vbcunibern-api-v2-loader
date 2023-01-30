import axios from 'axios';
import { loaderConfig } from '../../config/loader-config';
import { GameResponse } from '../../types/game.type';

export const getGames = async () => await axios.get<[GameResponse]>(loaderConfig.API_GAMES_ENDPOINT, {
  headers: {
    Authorization: loaderConfig.API_KEY
  }
}).then(response => {
  console.log(response.data);
  return response.data;
});
