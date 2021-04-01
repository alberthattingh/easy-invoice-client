import UserModel from "../models/UserModel";
import axios, {AxiosResponse} from "axios";

const BASE_URL = "https://easy-invoice-api.herokuapp.com/Users/authenticate";

export function login(email: string, password: string): Promise<AxiosResponse<UserModel>> {
    return axios.post<UserModel>(BASE_URL, {
        email: email,
        password: password
    });
}
