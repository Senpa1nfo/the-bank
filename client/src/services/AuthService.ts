import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('auth/login', {email, password});
    }

    static async registration(name: string, email: string, password: string, salary: number): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('auth/registration', {name, email, password, salary});
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>('auth/refresh', {withCredentials: true});
    }

    static async logout(): Promise<void> {
        return $api.post('auth/logout');
    }
}