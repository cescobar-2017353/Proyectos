export class eventModel{
    constructor(
        public id: string,
        public user: string,
        public type: string,
        public startDate: Date,
        public finishDate: Date,
        public status: string,
        public extras: [],
        public cost: number,
        public hotel: string
    ){}
}