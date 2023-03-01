import { randomUUID } from 'crypto';
import { GameResponseDAO } from '../../types/dao/game-response.dao.type';
import { ResultDTO, SetResult } from '../../types/dto/result.dto.type';
import { GamesFetchService } from '../fetch/games-fetch.service';
import { Logger } from '../logger/logger.service';


export class ResultsExtractionService {

  // Club caption to filter for club team
  private VBCUNIBERN_MATCHER = 'VBC Uni Bern';

  private gamesFetcher = new GamesFetchService();

  private logger = new Logger(ResultsExtractionService.name);

  /**
   * Get array of cleansed data for all game results.
   * @returns Array of ResultDTO
   */
  getGameResults = async (): Promise<ResultDTO[]> => {
    const cleanedResults: ResultDTO[] = [];

    return this.gamesFetcher.getGameResultsAndDates().then((gameResultsAndDates) => {
      const [results, _] = gameResultsAndDates;

      for (let result of results) {
        // Extract all the info required from the result data set
        const [hasHomeTeamWon, hasAwayTeamWon] = this.hasTeamWon(result);
        const [nbrOfSetsHomeTeam, nbrOfSetsAwayTeam] = this.getSetsWon(result);
        const [setsHome, setsAway] = this.getSets(result);
        const leagueShort = result.league.translations.shortD.split('|')[1]!.trim().toLowerCase() + result.gender

        // Create a ResultDTO with all the extracted data
        cleanedResults.push({
          uid: randomUUID(),
          teamId: this.getTeamId(result, this.VBCUNIBERN_MATCHER),
          league: leagueShort,
          date: new Date(result.playDate).toLocaleDateString('de-DE'),
          homeTeamResult: {
            teamName: result.teams.home.caption,
            win: hasHomeTeamWon,
            setsWon: nbrOfSetsHomeTeam,
            sets: setsHome
          },
          awayTeamResult: {
            teamName: result.teams.away.caption,
            win: hasAwayTeamWon,
            setsWon: nbrOfSetsAwayTeam,
            sets: setsAway
          }
        })
      }

      return Promise.resolve(cleanedResults);
    }).catch(err => {
      this.logger.error(err);
      return Promise.reject(err);
    });
  }

  /**
   * Get team id for a certain club's team.
   * @param result the game result to extract the id from
   * @param matcher the club's name to find the correct team
   * @returns string with the team id
   */
  private getTeamId = (result: GameResponseDAO, matcher: string): string => {
    const homeTeam = result.teams.home;
    const awayTeam = result.teams.away;

    if (homeTeam.caption === matcher) {
      return homeTeam.teamId.toString();
    } else {
      return awayTeam.teamId.toString();
    }
  }

  /**
   * Return for both the home and the away team, whether they have won the game.
   * @param result the game result to extract the info from
   * @returns true for the victorious team, false for the defeated team
   */
  private hasTeamWon = (result: GameResponseDAO): [boolean, boolean] => {
    const hasHomeTeamWon = result.resultSummary.winner === 'team_home';
    const hasAwayTeamWon = result.resultSummary.winner === 'team_away';

    return [hasHomeTeamWon, hasAwayTeamWon]
  }

  /**
   * Get the number of sets won by both the home and the away team.
   * @param result the game result to extract the number of won sets from
   * @returns number of sets won for each of the teams
   */
  private getSetsWon = (result: GameResponseDAO): [string, string] => {
    const nbrOfSetsWonByHomeTeam = result.resultSummary.wonSetsHomeTeam.toString();
    const nbrOfSetsWonByAwayTeam = result.resultSummary.wonSetsAwayTeam.toString();

    return [nbrOfSetsWonByHomeTeam, nbrOfSetsWonByAwayTeam]
  }

  /**
   * Get the exact set results for both the home and the away team
   * @param result the game result to extract the set results from
   * @returns an array of set results for each of the teams
   */
  private getSets = (result: GameResponseDAO): [SetResult[], SetResult[]] => {
    const homeSets: SetResult[] = []
    const awaySets: SetResult[] = []

    for (let i = 0; i < 5; i++) {
      const setResult = result.setResults[i];
      const setPlayed = setResult !== undefined;

      homeSets.push({
        played: setPlayed,
        points: setPlayed ? setResult.home.toString() : '-'
      })

      awaySets.push({
        played: setPlayed,
        points: setPlayed ? setResult.away.toString() : '-'
      })
    }

    return [homeSets, awaySets];
  }
}
