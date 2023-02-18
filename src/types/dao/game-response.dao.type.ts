interface Team{
  teamId: number,
  caption: string,
  clubId: number,
  clubCaption: string
}

interface Translations{
  d: string,
  shortD: string,
  f: string,
  shortF: string
}

interface League{
  leagueId: number,
  leagueCategoryId: number,
  caption: string,
  translations: Translations
}

interface Phase{
  phaseId: number,
  caption: string,
  translations: Translations
}

interface Group{
  groupId: number,
  caption: string,
  translations: Translations
}

interface Referee{
  lastName: string,
  firstName: string
}

interface Hall{
  hallId: number,
  caption: string,
  street: string,
  number: string,
  zip: number,
  city: string,
  latitude: number,
  longitude: number,
  plusCode: string
}

interface Result{
  home: number,
  away: number
}

interface ResultSummary{
  wonSetsHomeTeam: number,
  wonSetsAwayTeam: number,
  winner: "team_home" | "team_away"
}

export interface GameResponseDAO{
  gameId: number,
  playDate: string,
  playDateUtc: string,
  gender: string,
  status: number,
  teams: {
    home: Team,
    away: Team
  },
  league: League,
  phase: Phase,
  group: Group,
  hall: Hall,
  referees: [Referee],
  setResults: [Result],
  resultSummary: ResultSummary
}
