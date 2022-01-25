/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import {React, useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormStudent from '../components/pure/forms/formStudent';
import {findStudentForId} from '../services/loginService'
import {appContext} from '../App'

import '../styles/student.css'

const Student = () => {
    
   const history = useHistory();
   const {idstudent} = useParams();
   const { token } = useContext(appContext);

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
        setStudent(response.data)
        setStudentOk(true)}
    if (response.status===404)
        setStudent(studentInit)
    if ((response.status!==200)&&(response.status!==404))
        localStorage.setItem("login_data", '');
    console.log(response.status)
    console.log(response.data)
}

useEffect(() => {
    uploadStudent(idstudent)
    
    return () => {
        
    };
}, []);
        

   

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
                    
                    
                    <FormStudent student={student}></FormStudent>
                
                </div>}
        
        
                <div class="col-8">
                    <iframe id="visorname" src="http://cprmerida.juntaextremadura.net/manual.pdf" frameborder="0" height="700px" width="100%"></iframe>

                </div>
            </div>
                       
        </div> 
                        
    );
}

export default Student;
