import UserModel from '../models/UserModel';
import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://easy-invoice-api.herokuapp.com/Users/Auth';

export function login(email: string, password: string): Promise<AxiosResponse<UserModel>> {
    return axios.post<UserModel>(BASE_URL, {
        email: email,
        password: password,
    });
}

export const setToken = (token: string) => {
    return SecureStore.setItemAsync('secure_token', token);
};

export const getToken = (): Promise<string | null> => {
    return SecureStore.getItemAsync('secure_token');
};
