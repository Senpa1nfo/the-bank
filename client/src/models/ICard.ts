interface IOwner {
    name: string
}

export interface ICard {
    id: number;
    number: string;
    date: string;
    balance: number;
    owner: IOwner;
}