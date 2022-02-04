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
import { listStudents, listStudentsPerPage, findStudentsForKey, getSkills, addStudent, addStudentFile, addStudentPhoto } from '../services/loginService';
import Student from '../pages/student'




const Userstudent = () => {

	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

	
   

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
    
    

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
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

    const fetchUsers = async page => {
		setLoading(true);
        const url= 'student/allFilterPerPage/'+page+'/'+perPage

		const response = await listStudentsPerPage(filter.city,filter.country,filter.presence,filter.skills,filter.transfer,token,url) 
        console.log(response.status);
        console.log(response.data)

        if (response.data.length>0)
		    setTotalRows(response.data[0].document);
        else
            setTotalRows(0);

		setStudents(response.data);
      
		setLoading(false);
	};

	const handlePageChange = page => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);
        const url= 'student/allFilterPerPage/'+page+'/'+newPerPage

		const response = await listStudentsPerPage(filter.city,filter.country,filter.presence,filter.skills,filter.transfer,token,url) 
        console.log(response.status);
        console.log(response.data)

        if (response.data.length>0)
		    setTotalRows(response.data[0].document);
        else
            setTotalRows(0);

		setStudents(response.data);
		setPerPage(newPerPage);
		setLoading(false);
	};
    
    const data = 
        students.map((student, index) => {
            return (
                {id : student.id,
                name: student.name,
                city: student.city,
                country: student.country,
                phoneNumber: student.phoneNumber,
                email: student.email,
                skills:convertSkills(student.skills)
            })}        
                )
                        
    function convertSkills(skills) {
        
        switch (skills.length) {
            case 0: return ""
            case 1: return <button className='tagStudent'>{skills[0].skill}</button>
            case 2: return <div>
                                <button className='tagStudent'>{skills[0].skill}</button>
                                <button className='tagStudent'>{skills[1].skill}</button>
                            </div>
            default: return <div>
                                <button className='tagStudent'>{skills[0].skill}</button>
                                 <button className='tagStudent'>{skills[1].skill}</button>
                                 <button className='tagStudent'>{"+"+String(skills.length-2)}</button>
                             </div>

        }


    }


    async function modifyFilter(city,country,presence,tags,transfer){
        
        
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
        setLoading(true);
        const url= 'student/allFilterPerPage/'+1+'/'+perPage

		const response = await listStudentsPerPage(filter.city,filter.country,filter.presence,filter.skills,filter.transfer,token,url) 
        console.log(response.status);
        console.log(response.data)

        if (response.data.length>0)
		    {setTotalRows(response.data[0].document);
            setStudents(response.data);}
        else
            {setTotalRows(0);
            setStudents([]);}

		
		setPerPage(perPage);
		setLoading(false);
            
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
            const url = 'student/create/document/'+id
            let document = new FormData(); // Crear objeto de formulario
             document.append('document', studentPrueba.document);
             await addStudentFile(token,document,url)}
        if (studentPrueba.photo!==null){
            console.log("voy a mandar a crear la foto y no hay estudiante")
            let photo = new FormData(); // Crear objeto de formulario
            photo.append('photo', studentPrueba.photo);
            const url = 'student/create/photo/'+id
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

        fetchUsers(1);

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
                                    paginationComponentOptions={paginationComponentOptions}
                                    onRowDoubleClicked={(row)=>{history.push('/studentfile/'+row.id)}}
                                    progressPending={loading}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={totalRows}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    onChangePage={handlePageChange}
                                    noDataComponent={'No hay estudiantes que mostrar'}
                                    
                                    
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

                <FormAddStudent studentNew={studentNew} tagsOption={tagsOption} addStudentNew={addStudentNew}></FormAddStudent>

                           
                
            </div>
        );
    }

    


export default Userstudent;
