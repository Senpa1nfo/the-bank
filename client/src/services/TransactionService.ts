import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/AuthResponse";

export default class TransactionService {
    static async create(amount: number, fromCardNumber: string, toCardNumber: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`transaction`, {amount, fromCardNumber, toCardNumber});
    }

    static async getAll(cardNumber: string): Promise<AxiosResponse<ITransaction[]>> {
        return $api.get<ITransaction[]>(`transaction/${cardNumber}`);
    }
}