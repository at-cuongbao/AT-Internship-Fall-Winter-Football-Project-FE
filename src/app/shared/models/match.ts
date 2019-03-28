export class Match {
  id: string;
  group: string;y
  prediction: {
    firstTeam_score_prediction: string
    isAllow: boolean
    is_predicted: boolean
    secondTeam_score_prediction: string
  };
  round: number;
  start_at: string;
  firstTeam: {
    code: string;
    firstTeamId: string;
    firstTournamentTeamId: string;
    logo: string;
    score: string;
    winners: boolean
  };
  secondTeam: {
    code: string;
    secondTeamId: string;
    secondTournamentTeamId: string;
    logo: string;
    score: string;
    winners: boolean
  }
  
  // constructor()
  constructor(start_at: string, firstTeam: any, secondTeam: any) {
    this.start_at = start_at;
    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam
  }
}
