import UserModel from '../shared/models/user-model';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './login.service';
import ENV from '../shared/environment';
import { LogoData } from '../shared/models/logo-data';

const BASE_URL = `${ENV.apiUrl}/Users`;

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

export async function updateUserLogo(logoData: LogoData): Promise<AxiosResponse<UserModel>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },
    };

    const formData = new FormData();
    formData.append('file', logoData as any);

    return axios.post<UserModel>(`${BASE_URL}/Logo`, formData, config);
}

// export async function getUserLogo(): Promise<AxiosResponse<x>> {
//     const token = await getToken();
//     const config: AxiosRequestConfig = {
//         headers: {
//             Authorization: 'Bearer ' + token,
//         },
//     };

//     return axios.get<x>(`${BASE_URL}/Logo`, config);
// }
