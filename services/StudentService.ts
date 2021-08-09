import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './LoginService';
import StudentModel from '../models/StudentModel';

const BASE_URL = 'https://easy-invoice-api.herokuapp.com/Students';

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
