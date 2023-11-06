import $api from "../http";
import {ICard} from "../models/ICard.ts";
import {AxiosResponse} from "axios";

export default class CardService {
    static async create(userId: number) {
        return $api.post(`card/${userId}` );
    }

    static async delete(cardId: number) {
        return $api.delete(`card/${cardId}` );
    }

    static async getAll(userId: number): Promise<AxiosResponse<ICard[]>> {
        return $api.get<ICard[]>(`card/${userId}`);
    }

    static async getOne(cardNumber: string): Promise<AxiosResponse<ICard>> {
        return $api.get<ICard>(`card/get-one/${cardNumber}`);
    }
}