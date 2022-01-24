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

export const getCities = (token) => {
	return axios.get('http://localhost:8091/api/student/city', 
	{headers: {
		Authorization: 'Bearer ' + token
	},})
		
	
}

export const getCountries = (token) => {
	return axios.get('http://localhost:8091/api/student/country', 
	{headers: {
		Authorization: 'Bearer ' + token
	},})
		
	
}

export const addStudentFile = (token,document,url) => {
	return axios.post(url, 	
	document,
	{headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: 'Bearer ' + token
		
	}})
}


export const addStudentPhoto = (token,photo,url) => {
	return axios.post(url, 	
	photo,
	{headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: 'Bearer ' + token
		
	}})
}

export const addStudent = (token,student) => {
	return axios.post('http://localhost:8091/api/student/create', 	
	{
		"id": null,
        "name": student.name,
        "country": student.country,
        "city": student.city,
        "phoneNumber": student.phoneNumber,
        "email": student.email,
        "presence": student.presence,
        "transfer": student.transfer,
        "skills": student.skills,
        "photo": null,
        "document": null
	},
	{headers: {
		
		Authorization: 'Bearer ' + token
		
	}})
}
		
	


export const register = (name, email, password) => {
	return axios.post('http://localhost:8091/api/auth/register', {
		name,
		email,
		password
	});
}

