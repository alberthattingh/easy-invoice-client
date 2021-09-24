import UserModel from '../shared/models/user-model';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './login.service';

const BASE_URL = 'https://easy-invoice-api.herokuapp.com/Users';

export function signUp(userDetails: UserModel): Promise<AxiosResponse<UserModel>> {
    return axios.post<UserModel>(BASE_URL, userDetails);
}

export async function updateUserDetails(userDetails: UserModel): Promise<AxiosResponse<UserModel>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.put<UserModel>(BASE_URL, userDetails, config);
}
