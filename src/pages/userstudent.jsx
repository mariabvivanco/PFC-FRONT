/* eslint-disable no-restricted-globals */
import React, { Component, useEffect } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import $ from 'jquery'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "../styles/userstudent.css"
import FilterUser from '../components/pure/forms/filterUser';
import { Form } from 'formik';
import FormAddStudent from '../components/pure/forms/formAddStudent';



const Userstudent = () => {
    
    const history = useHistory();
    const students = [
        {
            "id": 1,
            "name": "María Beatriz Vivanco Marrero",
            "country": "España",
            "city": "Madrid",
            "phoneNumber": "+3464100000",
            "email": "mariab.vivanco@gmail.com",
            "presence": "Mixed",
            "transfer": false,
            "skills": [
                {
                    "skill": "React"
                },
                {
                    "skill": "Spring"
                },
                {
                    "skill": "Angular"
                },
                {
                    "skill": "Java"
                }
            ],
            "photo": null,
            "document": null
        },
        {
            "id": 2,
            "name": "Leonardo Valdés Amaya",
            "country": "España",
            "city": "Valencia",
            "phoneNumber": "+3464100001",
            "email": "leonardo@gmail.com",
            "presence": "Mixto",
            "transfer": false,
            "skills": [
                {
                    "skill": "React"
                },
                {
                    "skill": "Angular"
                }
            ],
            "photo": null,
            "document": null
        },
        {
            "id": 3,
            "name": "Greidy Valdés Vivanco",
            "country": "Cuba",
            "city": "Habana",
            "phoneNumber": "+5345648524",
            "email": "leonardo@gmail.com",
            "presence": "Remote",
            "transfer": true,
            "skills": [
                {
                    "skill": "Java"
                },
                {
                    "skill": "Angular"
                },
                {
                    "skill": "Sprint"
                },
                {
                    "skill": "React"
                }
            ],
            "photo": null,
            "document": null
        }]
      
       
       useEffect(() =>{
        var table = $('#tabla').DataTable({  paging: false,  info:false,
            dom: '<"search"><t>',
                language: {
                search: "Alumnos", //To remove Search Label _INPUT_
                searchPlaceholder: "Buscar por nombre email o palabra clave."
                
        }
        });
        $('#search').on( 'keyup', function () {
            table.search( this.value ).draw();
            
             } );

             
       
             
         $('#tabla tbody').on( 'click', 'tr', function () {
                                           
            history.push("/studentfile");
                        
        } );

        
 
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
                            <div class="row">
                                <div class id="table">
                                <table id="tabla" class="table table-responsive">
                                    <thead>
                                         <tr>
                                            <th scope="col">Nombre  </th>
                                            <th scope="col">Ciudad </th>
                                            <th scope="col">País </th>
                                            <th scope="col">Teléfono </th>
                                            <th scope="col">Correo Electrónico </th>
                                            <th scope="col">Etiquetas </th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody >
                                        { students.map((student, index) => {
                                            return (
                                                <tr>
                                                    <td>{student.name}</td>
                                                    <td>{student.city}</td>
                                                    <td>{student.country}</td>
                                                    <td>{student.phoneNumber}</td>
                                                     <td>{student.email}</td>
                                                    <td>
                                                    { student.skills.map((skill, index) => {
                                                        return (
                                                            <span id="tags">{skill.skill}</span>
                                                        )})}
                                                    </td>
                                                </tr>
                                                )}
                                        )}
                       
                                       
                                    </tbody>
                                      
                                </table>
                                </div>    
                            </div>

                        </div>
                        <div class="col col-sm-1" id="filter" style={{backgroundColor:"transparent"}}>
                            
                            
                        </div>
                        <div class="col col-sm-2" id="filter">
                            <FilterUser></FilterUser>
                            
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
