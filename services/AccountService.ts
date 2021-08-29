import UserModel from '../models/UserModel';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://easy-invoice-api.herokuapp.com/Users';

export function signUp(userDetails: UserModel): Promise<AxiosResponse<UserModel>> {
    return axios.post<UserModel>(BASE_URL, userDetails);
}
