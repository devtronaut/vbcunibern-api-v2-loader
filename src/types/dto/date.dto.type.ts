interface Location {
  caption: string,
  street: string,
  number: string,
  zip: number,
  city: string
}

export interface DateDTO {
  // unique id
  uid: string,

  // grouping id for all dates of this team (not unique)
  teamId: string,
  date: string,
  time: string,
  league: string,
  opponent: string,
  gametype: string,
  homeaway: "home" | "away",
  location: Location
}
