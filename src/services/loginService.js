import axios from 'axios';

export const login = (email, password) => {
	return axios.post('http://localhost:8091/api/auth/login', {
		email,
		password
	});
}

export const forgot = (email) => {
	return axios.post('http://localhost:8091/api/user/forgPassword', {
		email
	});
}

export const verifyCode = (email, code) => {
	return axios.post('http://localhost:8091/api/user/verifyCode', {
		email,code
	});
}

export const changePassword = (email,password) => {
	return axios.post('http://localhost:8091/api/user/changePassword', {
		email,
		password
	});
}

export const listStudents = (city,country,presence,skills,transfer,token) => {
	return axios.post('http://localhost:8091/api/student/allFilter', {
		city,
		country,
		presence,
		skills,
		transfer,
	},
	{headers: {
		Authorization: 'Bearer ' + token
	}})
		
	
}

export const findStudentsForKey = (keyWord,token) => {
	return axios.get('http://localhost:8091/api/student/keyWord', 
	{headers: {
		Authorization: 'Bearer ' + token
	},params: {
		keyWord
	}})
		
	
}


export const getSkills = (token) => {
	return axios.get('http://localhost:8091/api/skill/all', 
	{headers: {
		Authorization: 'Bearer ' + token
	},})
		
	
}

export const register = (name, email, password) => {
	return axios.post('http://localhost:8091/api/auth/register', {
		name,
		email,
		password
	});
}

