export class teamModel{
    constructor(
        public id: string,
        public name: string,
        public teamPoints: number,
        public positiveGoals: number,
        public negativeGoals: number,
        public differenceGoals: number,
        public gamesPlayed: number,
        public league: string,
        public user: string
    ){ }
}