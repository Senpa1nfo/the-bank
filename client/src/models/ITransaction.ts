interface ITransaction {
    id: number;
    from: string;
    fromCardNumber: string;
    to: string;
    toCardNumber: string;
    amount: number;
    date: Date;
}