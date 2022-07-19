export class productBranchModel{
    constructor(
        public id: string,
        public stock: number,
        public totalSales:number,
        public productCompany: string,
        public branch:string
    ){}
}