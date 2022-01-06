/* eslint-disable jsx-a11y/alt-text */
import { Button } from 'bootstrap';
import {React, useEffect, useState, useRef} from 'react';

import '../../../styles/formStudent.css'

const FormStudent = () => {


    const nameInit = "Nombre del Alumno";
    const cityInit= "Ciudad";
    const countryInit="País"
    const tagsoption = ["HTMLyCSS","SPRING","PHP","JAVA","PYTHON","REACT","ANGULAR" ]
    const listoption = new Array(tagsoption.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    
    
   
    const [tags, setTags] = useState([]);
    const [name, setName] = useState(nameInit);
    const [city, setCity] = useState(cityInit);
    const [country, setCountry] = useState(countryInit);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    const trash = <i class="fa-thin fa-trash-can"></i>

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


        for (var i=0; i<tagsoption.length&&!exist;i++){
            if (tagsoption[i]==tag)
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
        <div id="student" >
            <div class="candidate-data">
             
             <div class="row">
                 <div class="col-3">
                     <img id="photo" src="https://imagenes.elpais.com/resizer/TSqiwRMUuufmwlYTifJZvt4DCdM=/100x100/s3.amazonaws.com/arc-authors/prisa/f83e1e00-58fc-4f9b-9546-7eb3a5b88b09.jpg"/>

                 </div>
        
                 <div class="col-9">
                     <div >
                         <label id="lbStudentName">{name}</label>
                     </div>
                     <div id="city_country">
                         <a id="map" >&#xf041;</a>  
                         <a id="lbCityName">  {city}</a>
                         <a id="lbCountryName">|{country}</a>

                     </div>
             
                 </div>
             </div>
             <div class="row">
                <div class="col-12">
                    <label class="label" >
                        Nombre y Apellidos
                    </label>
                </div>
         
            </div>
            <div class="row">
                <div class="col-12">
                    <input name="studentname" id="studentname" class="entry" type="text" placeholder="Nombre Alumno" onChange={event => setName(event.target.value)} />
                 </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label  class="label">No Teléfono</label>
                 </div>
                <div class="col-6">
                    <label  class="label">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <input class="entry" type="phone"/>
                </div>
         
                <div class="col-6">
                    <input class="entry" type="email"/>
                </div>
         
            </div>
            <div class="row">
                <div class="col-6">
                    <label  class="label">País</label  >
                </div>
                
                    <div class="col-6">
                        <label  class="label">Ciudad</label >
                    </div>
                
            </div>
            <div class="row">
                <div class="col-6">
                    <select class="entry" id="countryname" onChange={event => setCountry(event.target.value)}>
                        <option value="" disabled selected hidden>Elija País</option>
                        <option>España</option>
                        <option>Cuba</option>
                        <option>Estados Unidos</option>
                    </select>
                </div>
                <div class="col-6" >
                    <select class="entry" id="cityname" onChange={event => setCity(event.target.value)}  >
                        <option value="" disabled selected hidden>Elija Ciudad</option>
                        <option>Madrid</option>
                        <option>Habana</option>
                        <option>Nueva York</option>
                        <option>Valencia</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label  class="label">Traslado</label>
                </div>
                <div class="col-6">
                    
                        <label  class="label">Presencialidad</label>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <select class="entry">
                        <option>Si</option>
                        <option>No</option>
                    </select>
                </div>
                <div class="col-6" >
                    <select class="entry">
                        <option>Presencial</option>
                        <option>En Remoto</option>
                        <option>Mixto</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="col-12">
                    <label  class="label">Documento CV</label>
                </div>

            </div>
            <div>
                <div class="col-12">
                    <button name="update" id="update">&#xF0ee; Subir de Nuevo</button>
                    <button name="delete" id="delete">&#xF014; Borrar</button>
                </div>

            </div>
            <div>
            <div class="col-12">
                <label  class="label">Etiquetas</label>
            </div>

            </div>
            <div class="col-12">
                <input ref={inputRef} id="tagname" type="text" class="entry" list="tagslist" placeholder="Escriba para buscar" onChange={()=> {addTag(inputRef.current.value)}}/>
                <datalist ref={listRef} id="tagslist" >
                    {listoption}
                </datalist>
            </div>
                            
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
                        }
                    )}
            </div>

        </div>
            </div>
                       
        </div> 
                        
    );
}

export default FormStudent;