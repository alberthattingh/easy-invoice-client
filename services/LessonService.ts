import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LessonModel from '../models/LessonModel';
import { getToken } from './LoginService';

const BASE_URL = 'https://easy-invoice-api.herokuapp.com/Lessons';

export async function getLessons(): Promise<AxiosResponse<LessonModel[]>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.get<LessonModel[]>(BASE_URL, config);
}

export async function addNewLesson(lessonDetails: LessonModel): Promise<AxiosResponse<LessonModel>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.post<LessonModel>(BASE_URL, lessonDetails, config);
}

export async function deleteLesson(lessonId: number): Promise<AxiosResponse> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.delete(`${BASE_URL}/${lessonId}`, config);
}
