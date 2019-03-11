export class Team {
  name: string;
  code: string;
  cover: string;
  logo: string;

  constructor()
  constructor(team: Team)
  constructor(team?: Team) {
    if (team) {
      this.name = team.name;
      this.code = team.code;
      this.cover = team.cover;
      this.logo = team.logo;
    }
  }

}
