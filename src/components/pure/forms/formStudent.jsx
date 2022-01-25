/* eslint-disable jsx-a11y/alt-text */
import { Button } from 'bootstrap';
import {React, useEffect, useState, useRef, useContext} from 'react';
import {appContext} from '../../../App'
import {getSkills} from '../../../services/loginService'


import '../../../styles/formStudent.css'

const FormStudent = ({student}) => {

    

    const nameInit = "Nombre del Alumno";
    const cityInit= "Ciudad";
    const countryInit="País"
    const countrylist =  ['Estados Unidos', 'Rusia', 'China', 'Alemania', 'Reino Unido', 'Francia','Canadá', 'Suiza', 
    'Australia', 'Turquía', 'Italia', 'España', 'Suiza','Bélgica', 'Brasil', 'Chile', 'Venezuela', 'Cuba', 'Argentina',
    'México', 'Uruguay', 'Paraguay']
    const countrysort=countrylist.sort()
    
    const countryoption = new Array(countrysort.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    
    const tagsInit= []
    student.skills.forEach(skill => {tagsInit.push(skill.skill)});
    const { token } = useContext(appContext);

    
    const [tags, setTags] = useState(tagsInit);
    const [name, setName] = useState(student.name);
    const [city, setCity] = useState(student.city);
    const [tagsoption, setTagsOption] = useState([])
    const [country, setCountry] = useState(student.country);
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const inputNameRef = useRef(null);
    const inputCityRef = useRef(null);
    const inputPhoneNumberRef = useRef();
    const inputEmailRef = useRef();
    const selectTransferRef = useRef();
    const selectCountryRef = useRef();
    const selectPresenceRef = useRef();

    const listoption = new Array(tagsoption.map((option,key) =>  <option key={key} value={option}>{option}</option>))

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

    function presence() {
        if (student.presence==='Mixed')
                selectPresenceRef.current.value = 'Mixto'
        else if (student.presence==='Face_to_face')
                selectPresenceRef.current.value = 'Presencial'
                else selectPresenceRef.current.value = 'En Remoto'
            
    }

    

    useEffect(() => {
        
        inputNameRef.current.value=student.name
        inputPhoneNumberRef.current.value=student.phoneNumber
        inputEmailRef.current.value=student.email
        inputCityRef.current.value=student.city
        selectTransferRef.current.value = student.transfer ? 'Si' : 'No'
        selectCountryRef.current.value=student.country
        presence()

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
        
        
       
    }, []);

    
        
    

    
    return (
        <div id="student" >
            <div class="candidate-data">
             
             <div class="row">
                 <div class="col-3">
                     <img id="photo" src={student.photo}/>

                 </div>
                 <div class="col-1">
                     

                 </div>
        
                 <div class="col-8" id='title'>
                     <div >
                         <label id="lbStudentName">{name}</label>
                     </div>
                     <div  id="city_country">
                         <a id="map" >&#xf041;</a>  
                         <a id="lbCityName">  {city}</a>
                         <a id="lbCountryName">|{country}</a>

                     </div>
             
                 </div>
             </div>
             <div class="row">
                <div class="col-auto">
                    <label class="label" >
                        Nombre y Apellidos
                    </label>
                </div>
         
            </div>
            <div class="row">
                <div class="col-auto">
                    <input ref={inputNameRef} name="studentname" id="studentname" class="entry" type="text" placeholder="Nombre Alumno"
                    autocomplete="off" onChange={event => setName(event.target.value)} />
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
                    <input ref={inputPhoneNumberRef}  autocomplete="off" class="entry" type="phone"/>
                </div>
         
                <div class="col-6">
                    <input ref={inputEmailRef} class="entry" type="email" autocomplete="off"/>
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
                    <select class="entry" id="countryname" ref={selectCountryRef} onChange={event => setCountry(event.target.value)}>
                        <option value="" disabled selected hidden>Elija País</option>
                        {countryoption}
                    </select>
                </div>
                <div class="col-6" >
                    <input ref={inputCityRef} name="cityname" id="cityname" class="entry" type="text" placeholder="Elija una Ciudad"
                        autocomplete="off" onChange={event => setCity(event.target.value)} />   
                    
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
                    <select class="entry" ref={selectTransferRef}>
                        <option>Si</option>
                        <option>No</option>
                    </select>
                </div>
                <div class="col-6" >
                    <select class="entry" ref={selectPresenceRef}>
                        <option>Presencial</option>
                        <option>En Remoto</option>
                        <option>Mixto</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="col-auto">
                    <label  class="label">Documento CV</label>
                </div>

            </div>
            <div>
                <div class="col-auto">
                    <button name="update" id="update">&#xF0ee; Subir de Nuevo</button>
                    <button name="delete" id="delete">&#xF014; Borrar</button>
                </div>

            </div>
            <div>
            <div class="col-auto">
                <label  class="label">Etiquetas</label>
            </div>

            </div>
            <div class="col-auto">
                <input ref={inputRef} id="tagname" type="text" class="entry" list="tagslist" placeholder="Escriba para buscar" 
                autocomplete="off" onChange={()=> {addTag(inputRef.current.value)}}/>
                <datalist ref={listRef} id="tagslist" >
                    {listoption}
                </datalist>
            </div>
                            
            <div class="contenido">
            <div class="col-auto">
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