import axios from 'axios';
import { loaderConfig } from '../../config/loader-config';
import { GameResponseDAO } from '../../types/dao/game-response.dao.type';
import { Logger } from '../logger/logger.service';

export class GamesFetchService{

  private logger = new Logger(GamesFetchService.name);

  /**
   * Get all games in the calendar seperated in results (played games) and dates (upcoming games)
   * @returns an array for results and an array for dates
   */
  public getGameResultsAndDates = async (): Promise<[GameResponseDAO[], GameResponseDAO[]]> => {
    const games: GameResponseDAO[] = await this.getGames();
    if(games.length === 0) return Promise.reject('Server returned no data to process.');

    const results: GameResponseDAO[] = new Array<GameResponseDAO>();
    const dates: GameResponseDAO[] = new Array<GameResponseDAO>();

    games.forEach(game => {
      if(game.setResults[0] != null){
        results.push(game);
      } else {
        dates.push(game);
      }
    })

    return [results, dates];
  }

  /**
   * Get all games in the calendar.
   * @returns
   */
  private getGames = async () => await axios.get<[GameResponseDAO]>(loaderConfig.API_GAMES_ENDPOINT, {
    headers: {
      Authorization: loaderConfig.API_KEY
    }
  }).then(response => {
    if(response.status !== 200){
      return Promise.reject(`HTTP Response code was ${response.status} with text: ${response.statusText}.`);
    }

    if(response.data.length.toString() === '0'){
      return Promise.reject(`HTTP Response is empty.`);
    }

    this.logger.info(`HTTP Response code was ${response.status} with text: ${response.statusText}. Data: ${response.data.length}`);
    return response.data;
  }).catch(err => {
    this.logger.error(err);
    return [];
  });
}
