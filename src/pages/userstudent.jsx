/* eslint-disable no-restricted-globals */
import React, { Component, useEffect, useContext, useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import $ from 'jquery'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "../styles/userstudent.css"
import FilterUser from '../components/pure/forms/filterUser';
import { Form } from 'formik';
import FormAddStudent from '../components/pure/forms/formAddStudent';
import {appContext} from "../App"
import {Students} from "../models/students"
import DataTable from 'react-data-table-component';
import { listStudents } from '../services/loginService';
import Axios from "axios";



const Userstudent = () => {

    const filterInit = {
        country: null,
        city:null,
        presence:null,
        transfer:null,
        skills:null,

    }
    
    const history = useHistory();
    const { token } = useContext(appContext);
    const [students, setStudents] =  useState([])
    const [filter, setFilter] = useState(filterInit)
     
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
                {id : {index},
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
			}).catch(console.log('error'));
            
    }

        
       
       useEffect( () =>{

        
            
            listStudents(filter.city,filter.country,filter.presence,filter.skills,filter.transfer,token)
			.then((response) => {
                
				if(response.status === 200) {
					setStudents(response.data)
					
				} else {
					
					localStorage.setItem("login_data", '');
					
				}
			}).catch(console.log('error'));


            
        
		
            

            $('#studentadd').on('hidden.bs.modal', function (e) {
                $(this).removeData('bs.modal');
                $(this).find('.modal-content').empty();
            })
       }, [])
    

    
        return (
            
            
            <div>
                <body className="user" >
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
                                    <input type="search" name="search" id="search" placeholder="&#xf002; Buscar por nombre email o palabra clave"></input>
                                </div>
                                <div class="col col-sm-2" >
                                    <button id="add" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#studentadd">Añadir Alumnos</button>
                                </div>

                            </div>
                            
                            <div class="row" id="tabla">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    customStyles={customStyles}
                                    onRowDoubleClicked={()=>{history.push("/studentfile")} }
                                   
                                    
                                />
                            </div>

                        </div>
                        <div class="col col-sm-1" id="filter" style={{backgroundColor:"transparent"}}>
                            
                            
                        </div>
                        <div class="col col-sm-2" id="filter">
                            <FilterUser modifyFilter={modifyFilter}></FilterUser>
                            
                        </div>
                        
                    </div>
                   
                </body>
                
                <div id="studentadd" className="modal" tabIndex="-1">
                    <div className="modal-dialog modal-xl" >
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo Alumno</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div className="modal-body">
                                <FormAddStudent></FormAddStudent>
                            </div>
                            <div className="modal-footer">
                                
                                <button id="save" type="button" className="btn btn-primary">Guardar</button>
                                <button id="discard" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        );
    }

    


export default Userstudent;
