import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './login.service';
import { CreatedInvoice, InvoiceModel, NewInvoiceDetailsModel } from '../shared/models/invoice-models';
import SkipTake from '../shared/models/skip-take';
import * as FileSystem from 'expo-file-system';

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

export async function createNewInvoice(newInvoice: NewInvoiceDetailsModel): Promise<AxiosResponse<CreatedInvoice>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.post<CreatedInvoice>(`${BASE_URL}/New`, newInvoice, config);
}

export async function downloadInvoice(url: string): Promise<string> {
    var filename = url.split('/').pop();
    const { uri: localUri } = await FileSystem.downloadAsync(url, `${FileSystem.documentDirectory}${filename}.pdf`);
    return localUri;
}
