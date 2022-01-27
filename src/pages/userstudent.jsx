/* eslint-disable no-restricted-globals */
import React, { Component, useEffect, useContext, useState, useRef } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import $ from 'jquery'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "../styles/userstudent.css"
import FilterUser from '../components/pure/forms/filterUser';
import FormAddStudent from '../components/pure/forms/formAddStudent';
import {appContext} from "../App"
import DataTable from 'react-data-table-component';
import { listStudents, findStudentsForKey, getSkills, addStudent, addStudentFile, addStudentPhoto } from '../services/loginService';
import Student from '../pages/student'




const Userstudent = () => {
   

    const filterInit = {
        country: null,
        city:null,
        presence:null,
        transfer:null,
        skills:null,

    }

    const studentInit = {
        name: null,
        country: null,
        city:null,
        phoneNumber:null,
        email:null,
        presence:'Remote',
        transfer:false,
        skills:null,
        photo:null,
        document:null

    }
    
    const history = useHistory();
    const { token } = useContext(appContext);
    const [studentModal, setStudentModal] =  useState(studentInit)
    const [studentPrueba, setStudentPrueba] =  useState(studentInit)
    const [students, setStudents] =  useState([])
    const [filter, setFilter] = useState(filterInit)
    const [tagsOption, setTagsOption] = useState([]);
    const [upload,setUpload] = useState(false)
    


    function studentNew  (student) {
        setStudentPrueba(student)

    }
    
     
    const customStyles = {
        rows: {
            style: {
                
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontWeight: 'bold',
                FontFamily: 'Raleway'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
        
    };

    
    const columns = [

        {
            name: 'Id',
            selector: row => row.id,
            sortable:true,
            omit:true
                       
        },


        {
            name: 'Nombre',
            selector: row => row.name,
            sortable:true,
                       
        },
        {
            name: 'Ciudad',
            selector: row => row.city,
            sortable:true
        },
        {
            name: 'País',
            selector: row => row.country,
            sortable:true
        },
        {
            name: 'Teléfono',
            selector: row => row.phoneNumber,
            sortable:false
        },
        {
            name: 'Correo Electrónico',
            selector: row => row.email,
            sortable:true
        },
        {
            name: 'Etiquetas',
            selector: row => row.skills,
            sortable:false,
            id: 'skillsgreen',
                      
            
                
        },
        
    ];
    
    const data = 
        students.map((student, index) => {
            return (
                {id : student.id,
                name: student.name,
                city: student.city,
                country: student.country,
                phoneNumber: student.phoneNumber,
                email: student.email,
                skills: convertSkills(student.skills), 
            })}        
                )
                        
    function convertSkills(skills) {
        
        switch (skills.length) {
            case 0: return ""
            case 1: return [(skills[0].skill)]
            case 2: return [skills[0].skill, skills[1].skill]
            default: return [skills[0].skill, skills[1].skill, ("+"+String(skills.length-2))]

        }


    }


    function modifyFilter(city,country,presence,tags,transfer){
        
        
        const tempFilter = filter;
        if (!(city=='*'))
            tempFilter.city = city;
        if (!(country=='*'))
            tempFilter.country=country;
        if (!(presence=='*'))
            tempFilter.presence=presence;
        if (!(tags=='*'))
            tempFilter.skills=tags;
        if (!(transfer=='*'))
            tempFilter.transfer=transfer
        setFilter(tempFilter)
        listStudents(filter.city,filter.country,filter.presence,filter.skills,filter.transfer,token)
			.then((response) => {
                
				if(response.status === 200) {
					setStudents(response.data)
                    
					
				} else {
					
					localStorage.setItem("login_data", '');
					
				}
			}).catch(()=>{console.log('error');
                localStorage.setItem("login_data", '');}
            );
            
    }

    function studentNew  (student) {
        setStudentPrueba(student)

    }

    async function addStudentNew(){
        var id;

        try{ const response = await addStudent(token,studentPrueba);
            modifyFilter(filter.city,filter.country,filter.presence,filter.tags,filter.transfer);
            let json = response.data
            id=json.id;
            console.log(json.id);}
        catch(error) {console.log(error+ 'en estudiante');}

        if (studentPrueba.document!==null){
            const url = 'http://localhost:8091/api/student/create/document/'+id
            let document = new FormData(); // Crear objeto de formulario
             document.append('document', studentPrueba.document);
             await addStudentFile(token,document,url)}
        if (studentPrueba.photo!==null){
            console.log("voy a mandar a crear la foto y no hay estudiante")
            let photo = new FormData(); // Crear objeto de formulario
            photo.append('photo', studentPrueba.photo);
            const url = 'http://localhost:8091/api/student/create/photo/'+id
            await addStudentPhoto(token,photo,url)}

            
    }



    function searchForKey(keyWord){
        
        findStudentsForKey(keyWord,token)
			.then((response) => {
                
				if(response.status === 200) {
					setStudents(response.data)
                     
                 
					
				} else {
					
					localStorage.setItem("login_data", '');
					
				}
			}).catch(()=>{console.log('error');
                localStorage.setItem("login_data", '');}
            );
            
    }

    function uploadChange(){
        setUpload(true);
    }

        
       
       useEffect( () =>{

        
            
            listStudents(filter.city,filter.country,filter.presence,filter.skills,filter.transfer,token)
			.then((response) => {
                
				if(response.status === 200) {
					setStudents(response.data)
                     
                 
					
				} else {
					
					localStorage.setItem("login_data", '');
					
				}
			}).catch(()=>{console.log('error');
            localStorage.setItem("login_data", '');});

            
            getSkills(token)
			.then((response) => {
                
				if(response.status === 200) {
					setTagsOption(response.data)
					
				} else {
					
					localStorage.setItem("login_data", '');
					
				}
			}).catch(()=>{console.log('error');
                localStorage.setItem("login_data", '');}
            );
		
            

            $('#studentadd').on('hidden.bs.modal', function (e) {
                $(this).removeData('bs.modal');
                $(this).find('.modal-content').empty();
            })
       },[])
    

    
        return (
            
            
            <div>
                <div className="user" >
                    <div class="row" id="firstrow">
                        <div class="col col-sm-10" id="title">
                        <h3  href="/studentfile" >OpenBootcamp<a id="student">|Alumnos</a> </h3>
                        </div>
                        <div class="col col-sm-2" id="user">
                            <select name="username" id="username" value="UserName"  >
                                <option id="user">UserName</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" id="restrow">
                        <div class="col col-sm-9" id="data">
                            <div class="row" id="search_and_add">
                                <div class="col col-sm-10" id="searchh">
                                    <a>Alumnos</a>   
                                    <input type="search" name="search" id="search" placeholder="&#xf002; Buscar por nombre o email"
                                     onChange={()=>{searchForKey(event.target.value)}}></input>
                                </div>
                                <div class="col col-sm-2" >
                                    <button id="add" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#studentadd"
                                    >Añadir Alumnos</button>
                                </div>

                            </div>
                            
                            <div class="row" id="tabla">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    customStyles={customStyles}
                                    onRowDoubleClicked={(row)=>{history.push('/studentfile/'+row.id)}}
                                   
                                   
                                    
                                />
                            </div>

                        </div>
                        <div class="col col-sm-1" id="filter" style={{backgroundColor:"transparent"}}>
                            
                            
                        </div>
                        <div class="col col-sm-2" id="filter">
                            <FilterUser modifyFilter={modifyFilter} tagsOption={tagsOption}></FilterUser>
                            
                        </div>
                        
                    </div>
                   
                </div>
                
                <div id="studentadd" className="modal" tabIndex="-1">
                    <div className="modal-dialog modal-xl" >
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo Alumno</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div className="modal-body">
                                <FormAddStudent studentNew={studentNew} tagsOption={tagsOption}></FormAddStudent>
                                
                                
                            </div>
                            <div className="modal-footer">
                                
                                <button id="save" type="button" className="btn btn-primary"
                                     onClick={()=>{addStudentNew(); 
                                      } } >Guardar</button>
                                <button id="discard" type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                >Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
              
                
            </div>
        );
    }

    


export default Userstudent;
