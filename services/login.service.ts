import UserModel from '../shared/models/user-model';
import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import ENV from '../shared/environment';

const BASE_URL = `${ENV.apiUrl}/Users/Auth`;

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
