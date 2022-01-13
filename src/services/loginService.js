import axios from 'axios';

export const login = (email, password) => {
	return axios.post('http://localhost:8091/api/auth/login', {
		email,
		password
	});
}

export const register = (name, email, password) => {
	return axios.post('http://localhost:8091/api/auth/register', {
		name,
		email,
		password
	});
}