import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './login.service';
import StudentModel from '../shared/models/student-model';
import ENV from '../shared/environment';

const BASE_URL = `${ENV.apiUrl}/Students`;

export async function getStudents(): Promise<AxiosResponse<StudentModel[]>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.get<StudentModel[]>(BASE_URL, config);
}

export async function addNewStudent(student: StudentModel): Promise<AxiosResponse<StudentModel>> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.post<StudentModel>(BASE_URL, student, config);
}

export async function removeStudent(studentId: number): Promise<AxiosResponse> {
    const token = await getToken();
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return axios.delete<AxiosResponse>(`${BASE_URL}/${studentId}`, config);
}
