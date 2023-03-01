
interface TeamResult {
  teamName: string,
  win: boolean,
  setsWon: string,

  sets: SetResult[]
}

export interface SetResult {
  played: boolean,
  points: string
}

export interface ResultDTO {
  // unique id
  uid: string,

  // grouping id for all results of this team (not unique)
  teamId: string,
  league: string,

  date: string,

  homeTeamResult: TeamResult,

  awayTeamResult: TeamResult
}
