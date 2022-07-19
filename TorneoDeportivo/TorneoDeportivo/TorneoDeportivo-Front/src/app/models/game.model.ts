export class gameModel{
    constructor(
        public id: string,
        public teamLocal: string,
        public teamVisitor: string,
        public goalsLocal: number,
        public goalsVisitor: number,
        public league: string,
        public user: string
    ){ }
}