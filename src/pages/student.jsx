/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import {React, useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormStudent from '../components/pure/forms/formStudent';
import {findStudentForId,updateStudent,updateStudentFile, deleteStudentFile} from '../services/loginService'
import {appContext} from '../App'

import '../styles/student.css'
import { Students } from '../models/students';

const Student = () => {
    
   const history = useHistory();
   const {idstudent} = useParams();
   const { token } = useContext(appContext);
   const [studentChange,setStudentChange]=useState(false);

   const studentInit = {
    id:null,
    name: null,
    country: null,
    city:null,
    phoneNumber:null,
    email:null,
    presence:'Remote',
    transfer:false,
    skills:[],
    photo:null,
    document:null

}

const [student, setStudent] = useState(studentInit)
const [studentOk, setStudentOk] = useState(false)

async function uploadStudent(id){

    const url='http://localhost:8091/api/student/one/'+id
    const response = await findStudentForId(url,token);
    if (response.status===200){
        setStudentChange(true);
        const studentTemp=response.data;
        const skills= []
        response.data.skills.forEach(skill => {skills.push(skill.skill)});
        studentTemp.skills=skills;
        setStudent(studentTemp);
        setStudentOk(true)}
    if (response.status===404)
        setStudent(studentInit)
    if ((response.status!==200)&&(response.status!==404))
        localStorage.setItem("login_data", '');
    console.log(response.status)
    console.log(response.data)
    
}

    async function modifyStudent(studentChange) {
    //validar datos

    const studentTemp = studentChange;
   
    const skillsN = []
    studentTemp.skills.forEach((skillV) => {
        skillsN.push(skillV)});

    studentChange.skills =skillsN

    
    const url='http://localhost:8091/api/student/update/'+studentChange.id;
    const response= await updateStudent(url,token,studentChange);	
    
    if (response.status===200){
        console.log('estudiante actualizado ok')
        setStudentChange(true);
        setStudent(response.data)
        
        }
    
    else 
        localStorage.setItem("login_data", '');

    console.log(response.status)
    console.log(response.data)

}

async function modifyPdf(file,id) {
    
    const url='http://localhost:8091/api/student/update/document/'+id;
    let document = new FormData(); // Crear objeto de formulario
    document.append('document', file);
                        
    const response= await updateStudentFile(token,document,url);	
    
    if (response.status===200){
        console.log('documento actualizado ok')
        setStudent(response.data)
    }
    else 
        localStorage.setItem("login_data", '');
        
    console.log(response.status)
    console.log(response.data)

}

async function deletePdf(id) {
    
    const url='http://localhost:8091/api/student/delete/document/'+id;
    
                        
    const response= await deleteStudentFile(token,url);	
    
    if (response.status===200){
        console.log('documento borrado ok')
        setStudent(response.data)
    }
    else 
        localStorage.setItem("login_data", '');
        
    console.log(response.status)
    console.log(response.data)

}

useEffect(() => {
    uploadStudent(idstudent)
    
},[student]);
        

   

    return (
        <div id="student" >
           
            <div class="row" id="firstrow">
                <div  class="col-10"  >
                    <button style={{textAlign:"left"}} id="back" onClick={()=>{history.push("/userstudent")}}>&#xf060;          Volver</button>
                </div>
                <div  class="col-2">
                    <select id="username"> 
                        <option>UserName</option>
                    </select>

                </div>

            </div>

    
            <div class="row"  id="restrow">
        
                {studentOk&&<div class="col-4" id="form" >
                    
                    
                    <FormStudent student={student} modifyStudent={modifyStudent}
                         modifyPdf={modifyPdf} deletePdf={deletePdf}></FormStudent>
                
                </div>}
        
        
                <div class="col-8">
                    <iframe id="visorname" src={student.document} frameBorder="0" height="700px" width="100%"></iframe>

                </div>
            </div>
                       
        </div> 
                        
    );
}

export default Student;
