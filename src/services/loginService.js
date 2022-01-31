import axios from 'axios';

const urlbase ='http://localhost:8091/api/'

export const login = (email, password) => {
	return axios.post(urlbase + 'auth/login', {
		email,
		password
	});
}

export const forgot = (email) => {
	return axios.post(urlbase + 'user/forgPassword', {
		email
	});
}

export const verifyCode = (email, code) => {
	return axios.post( urlbase + 'user/verifyCode', {
		email,code
	});
}

export const changePassword = (email,password) => {
	return axios.post(urlbase + 'user/changePassword', {
		email,
		password
	});
}

export const listStudents = (city,country,presence,skills,transfer,token) => {
	return axios.post(urlbase + 'student/allFilter', {
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

export const listStudentsPerPage = (city,country,presence,skills,transfer,token,url) => {
	return axios.post(urlbase+url, {
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
	return axios.get(urlbase + 'student/keyWord', 
	{headers: {
		Authorization: 'Bearer ' + token
	},params: {
		keyWord
	}})
		
	
}

export const findStudentForId = (url,token) => {
	return axios.get(urlbase + url, 
	{headers: {
		Authorization: 'Bearer ' + token
	}})
		
	
}


export const getSkills = (token) => {
	return axios.get( urlbase + 'skill/all', 
	{headers: {
		Authorization: 'Bearer ' + token
	},})
		
	
}

export const getCities = (token) => {
	return axios.get( urlbase + 'student/city', 
	{headers: {
		Authorization: 'Bearer ' + token
	},})
		
	
}

export const getCountries = (token) => {
	return axios.get( urlbase + 'student/country', 
	{headers: {
		Authorization: 'Bearer ' + token
	},})
		
	
}

export const addStudentFile = (token,document,url) => {
	return axios.post(urlbase + url, 	
	document,
	{headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: 'Bearer ' + token
		
	}})
}


export const addStudentPhoto = (token,photo,url) => {
	return axios.post(urlbase + url, 	
	photo,
	{headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: 'Bearer ' + token
		
	}})
}

export const addStudent = (token,student) => {
	return axios.post( urlbase + 'student/create', 	
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

export const updateStudent = (url,token,student) => {
	return axios.put(urlbase + url, 	
		{
			"id": student.id,
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

export const updateStudentFile = (token,document,url) => {
	return axios.put(urlbase + url, 	
	document,
	{headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: 'Bearer ' + token
		
	}})
}

export const deleteStudentFile = (token,url) => {
	return axios.put(urlbase + url,null,	
	{headers: {
		Authorization: 'Bearer ' + token
		
	}})
	
}
		
	


export const register = (name, email, password) => {
	return axios.post(urlbase + 'auth/register', {
		name,
		email,
		password
	});
}

