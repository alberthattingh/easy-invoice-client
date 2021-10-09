import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import ENV from '../shared/environment';
import LessonModel from '../shared/models/lesson-model';
import { getToken } from './login.service';

const BASE_URL = `${ENV.apiUrl}/Lessons`;

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
