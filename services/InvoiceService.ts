import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './LoginService';
import { InvoiceModel, NewInvoiceDetailsModel } from '../models/InvoiceModels';
import SkipTake from '../models/SkipTake';

const BASE_URL = 'https://easy-invoice-api.herokuapp.com/Invoice';

export async function getAllInvoices(): Promise<AxiosResponse<InvoiceModel[]>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.post<InvoiceModel[]>(BASE_URL, {}, config);
}

export async function getRecentInvoices(skipTake: SkipTake): Promise<AxiosResponse<InvoiceModel[]>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.post<InvoiceModel[]>(`${BASE_URL}/Recent`, skipTake, config);
}

export async function createNewInvoice(newInvoice: NewInvoiceDetailsModel): Promise<AxiosResponse<InvoiceModel>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.post<InvoiceModel>(`${BASE_URL}/New`, newInvoice, config);
}
