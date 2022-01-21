import {React, useState, useRef} from 'react';
import {Students} from '../../../models/students'
import PropTypes from 'prop-types'
import UserStudent from '../../../pages/userstudent'

import "../../../styles/formAddStudent.css"


const FormAddStudent = ({studentNew,tagsOption}) => {
    //const tagsoption = ["HTMLyCSS","Spring","PHP","JAVA","PYTHON","REACT","ANGULAR" ]
    
    const listoption = new Array(tagsOption.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    const pdfInit=true;
    const photoInit=true;  
    const cityRef = useRef();
    const countryRef = useRef();
    const presRef = useRef(null);
    const remoteRef = useRef(null);
    const traslateRef = useRef(null);
    const notransfRef = useRef(null);

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
   
    const [tags, setTags] = useState([]);
    const [pdf, setPdf] = useState(pdfInit);
    const [photo, setPhoto] = useState(photoInit);
    const [student, setStudent] = useState(studentInit);
    
    
   
    const nameRef = useRef();
    const listRef = useRef();
    const inputRef = useRef();

    

    function deleteTag(tag){
        console.log('Detele this Tag:', tag);
        const index = tags.indexOf(tag);
        const tempTags = [...tags];
        tempTags.splice(index,1);
        setTags(tempTags);
    }

    function addTag(tag){
        var duplic = false;
        var exist= false;


        for (var i=0; i<tagsOption.length&&!exist;i++){
            if (tagsOption[i]==tag)
                exist=true;

        }

        for (var i=0; i<tags.length&&!duplic;i++){
            if (tags[i]==tag)
                duplic=true;

        }

        if (exist&&!duplic){
            console.log('ADD this Task:', tag);
            const tempTags = [...tags];
            tempTags.push(tag);
            setTags(tempTags);
            inputRef.current.value="";
        }
        
    }
    return (
        <>
        <div id="form-add">
        <div id="body" >
            <div class="row">
                <div class="col-6" id="datastudent">
                    <label class="label" >Nombre y Apellidos</label>
                    <input name="studentname" id="entry" type="text" ref={nameRef}  placeholder="Ej: Juan Pérez Lorca"
                    onChange={(event)=>{
                        const studentTemp = student;
                        studentTemp.name = event.target.value
                        setStudent(studentTemp)
                        studentNew(studentTemp)}}
                       />
                    
                    <div class="row">
                        <div class="col-6">
                            <div class="row" >
                                <label class="label" >
                                    País
                                </label>
                            </div>
                            <select class="entry" id="countryname"  ref={countryRef}
                                 onChange={()=>{
                                    const studentTemp = student;
                                    studentTemp.country = countryRef.current.value
                                    setStudent(studentTemp)
                                    studentNew(studentTemp)}}>
                                <option value="" disabled selected hidden>Elige un país</option>
                                <option>España</option>
                                <option>Cuba</option>
                                <option>Estados Unidos</option>
                            </select>

                            <label  class="label">No Teléfono</label>
                            <input class="entry" type="phone" placeholder='Ej: +34 612 34 56 78'
                                onChange={(event)=>{
                                    const studentTemp = student;
                                    studentTemp.phoneNumber = event.target.value
                                    setStudent(studentTemp)
                                    studentNew(studentTemp)}}/>


                            <label  class="label" ref={presRef}>Presencialidad</label>
                            <select class="entry" 
                                onChange={()=>{
                                    const studentTemp = student;
                                    function asignePresence () {
                                        if (presRef.current.value===('Presencial'))
                                            {studentTemp.presence='Face_to_face'}
                                        if (presRef.current.value===('En Remoto'))
                                            studentTemp.presence="Remote"
                                        if (presRef.current.value===('Mixto'))
                                            studentTemp.presence="Mixed"

                                    }
                                    asignePresence()
                                    setStudent(studentTemp)
                                    studentNew(studentTemp)}}>
                                <option id="example" value="" disabled selected hidden >Elige una opción</option>
                                <option>Presencial</option>
                                <option>En Remoto</option>
                                <option>Mixto</option>
                            </select>
                        
                        </div>
                        <div class="col-6">
                            <div class="row" >
                                    <label class="label" >
                                        Ciudad
                                    </label>
                                </div>
                                <input name="studentcity" id="studentcity" type="text" ref={cityRef}  placeholder="Elige una ciudad"
                                    onChange={(event)=>{
                                        const studentTemp = student;
                                        studentTemp.city = event.target.value
                                        setStudent(studentTemp)
                                        studentNew(studentTemp)}}
                       />
                                <label  class="label">Email</label>
                                <input class="entry" type="email" placeholder='Ej: user@mail.com'
                                 onChange={event=>{
                                                                       
                                    const studentTemp = student;
                                    studentTemp.email = event.target.value
                                    setStudent(studentTemp)
                                    studentNew(studentTemp)
                                }}/>
                                <label  class="label">Traslado</label>
                                <select id="select" class="entry" defaultValue="">
                                    <option id="example" value="" disabled selected hidden >Elige una opción</option>
                                    <option>Si</option>
                                    <option>No</option>                        
                                </select>
                            </div>
                        </div>
                    <div class="row" id="otherdata">
                        <div class="col-6">

                        </div>
                        <div class="col-6">
                            
                        </div>
                        
                    </div>


                </div>
                <div class="col-6" id="file-tag">
                    <label>Foto de Perfil</label>
                    {photo ? 
                         (<div class="row">
                            <div class="col-auto">
                                <button name="update" id="update" onClick={()=>setPhoto(!photo)}>&#xF0ee;Subir imagen</button>
                            </div>
                            <div class="col-8">
                                <label><a id="light">Archivos soportados</a><a id="bold">.png .jpg .jpeg</a></label>
                                <label><a id="light">Tamaño archivo máximo:</a><a id="bold">2 MB</a></label>
                            </div>
                        </div>)
                        
                     : 
                    <input name="photo" id="photo" class="entry" type="text" placeholder="&#xf03e;  NombreArchivo.png"  />
}
                    <label>Documento CV</label>
                    {pdf ? 
                         (<div class="row">
                            <div class="col-auto" >
                                <button name="update" id="update" onClick={()=>setPdf(!pdf)}>&#xF0ee;Subir documento Pdf</button>
                            </div>
                            <div class="col-6">
                                <label><a id="light">Archivos soportados</a><a id="bold">.pdf</a></label>
                                <label><a id="light">Tamaño archivo máximo:</a><a id="bold">20 MB</a></label>
                            </div>
                        </div>)
                        
                     :  <input name="pdf" id="pdf" class="entry" type="text" placeholder="&#xf1c1;  NombreArchivo.pdf"  />
                     
}
                    <label>Etiquetas</label>
                    
                    <input ref={inputRef} id="tagname" type="text" class="entry" list="tagslist" placeholder="Escriba para buscar" 
                        onChange={()=> {
                            addTag(inputRef.current.value)
                            const studentTemp = student;
                            studentTemp.skills = tags;
                            setStudent(studentTemp)
                            studentNew(studentTemp)}}/>
                        <datalist ref={listRef} id="tagslist" >
                            {listoption}
                        </datalist>
                    
                            
                    <div class="contenido">
                        <div class="col-12">
                        <a id="tags"></a>

                            { tags.map((tag, index) => {
                                return (
                                    <button                                 
                                        value={tag}
                                        name={tag}
                                        id="tag" onClick={()=> {deleteTag(tag)}}>
                                            {tag}  X
                                    </button>
                                )
                            })}
                    </div>
                    
                </div>

            </div>
            
            </div>
            
                
        </div>
      </div>
       
        </>
    );
}



export default FormAddStudent;
