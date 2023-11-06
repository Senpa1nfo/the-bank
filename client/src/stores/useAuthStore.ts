import {create} from "zustand";
import {IUser} from "../models/IUser.ts";
import AuthService from "../services/AuthService.ts";

interface AuthState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
    registration: (name: string, email: string, password: string, salary: number) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    refresh: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    registration: async (name: string, email: string, password: string, salary: number) => {
        const response = await AuthService.registration(name, email, password, salary)
        localStorage.setItem('token', response.data.refreshToken)
        set({
            user: response.data.user,
            isAuth: true,
            isLoading: false
        })
    },
    login: async (email: string, password: string) => {
        const response = await AuthService.login(email, password)
        localStorage.setItem('token', response.data.refreshToken)
        set({
            user: response.data.user,
            isAuth: true,
            isLoading: false
        })
    },
    refresh: async () => {
        set({
            isLoading: true
        })
        await AuthService.refresh()
            .then(res => {
                localStorage.setItem('token', res.data.refreshToken)
                set({
                    user: res.data.user,
                    isAuth: true,
                    isLoading: false
                })
            })
            .catch(() => {
                set({
                    isLoading: false
                })
            })
    },
    logout: async () => {
        await AuthService.logout()
        localStorage.removeItem('token')
        set({
            user: {} as IUser,
            isAuth: false,
            isLoading: false
        })
    }
}))