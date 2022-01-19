

import { Alert } from 'bootstrap';
import React, { useState, useRef } from 'react';
import "../../../styles/filterUser.css"
import PropTypes from 'prop-types';

const FilterUser = ({modifyFilter}) => {
    
    const countryInit="País"
    const tagsoption = ["HTMLyCSS","SPRING","PHP","JAVA","PYTHON","REACT","ANGULAR" ]
    const listoption = new Array(tagsoption.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    
    
   
    const [tags, setTags] = useState([]);
    const [name, setName] = useState(null);
    const [city, setCity] = useState(null);
    const [presence, setPresence] = useState(null);
    const [transfer, setTransfer] = useState(null);
    const [country, setCountry] = useState(null);
    const inputRef = useRef(null);
    const cityRef = useRef();
    const listRef = useRef();
    const presRef = useRef(null);
    const remoteRef = useRef(null);
    const traslateRef = useRef(null);
    const notransfRef = useRef(null);

    const trash = <i class="fa-thin fa-trash-can"></i>

    function deleteTag(tag){
        console.log('Detele this Tag:', tag);
        const index = tags.indexOf(tag);
        const tempTags = [...tags];
        tempTags.splice(index,1);
        modifyFilter(city,country,presence,tags,transfer)
        setTags(tempTags);
    }

    function addTag(tag){
        var duplic = false;
        var exist= false;


        for (var i=0; i<tagsoption.length&&!exist;i++){
            if (tagsoption[i]===tag)
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
            modifyFilter(city,country,presence,tags,transfer)
            inputRef.current.value="";
        }
        
    }

    

    return (
        <div>
            
             <div class="row" id="general">
                
                <div class="row">
                    <div class="col col-sm-10">                            
                        <p id="title" >Filtros de Busqueda</p>
                    </div>
                    <div class="col col-sm-2">
                        <i id="trash" className='bi-trash task-action' onClick={() => {}}></i> 
                    </div>

                </div>
                
                <div class="row">
                    <p id="tags">Etiquetas</p>
                    
                     <input ref={inputRef} id="tagname" type="text" class="entry" list="tagslist" placeholder="Escriba para buscar" onChange={()=> {addTag(inputRef.current.value)}}/>
                        <datalist ref={listRef} id="tagslist" >
                            {listoption}
                        </datalist>
                    
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
                                     
                    <p id="country" >País</p>
                    <select id="selectcountry" onChange={
                        event => {setCountry(event.target.value);
                        modifyFilter(city,country,presence,tags,transfer)}}>
                        <option>
                            España
                        </option>
                        <option>
                            Cuba
                        </option>
                    </select>
                    
                    <p id="city" >Ciudad</p>
                    <select   id="selectcity" ref={cityRef} onChange={
                        event => {setCity(event.target.value);
                        modifyFilter(city,country,presence,tags,transfer)}}>
                        <option>
                            Valencia
                        </option>
                        <option>
                            Madrid
                        </option>
                    </select>
                     
                    <p >Presencial/ a distancia</p>
                    <label>
                        <input id="check" type="checkbox" ref={presRef} 
                          onClick={()=>(((remoteRef.current.checked)) ?
                             remoteRef.current.checked=false:
                             null)}/>
                            Presencial
                    </label>
                    <label>
                        <input id="check" type="checkbox" ref={remoteRef} onClick={()=>(((presRef.current.checked)) ?
                             presRef.current.checked=false:
                             null)} />
                            A Distancia
                    </label>
                    
                    
                     
                    <p >Posibilidad de Traslado</p>
                    <label>
                        <input id="check" type="checkbox" ref={traslateRef} onClick={()=>(((notransfRef.current.checked)) ?
                             notransfRef.current.checked=false:
                             null)} />
                            Si
                    </label>
                    <label>
                        <input id="check" type="checkbox" ref={notransfRef} onClick={()=>(((traslateRef.current.checked)) ?
                             traslateRef.current.checked=false:
                             null)} />
                            No
                    </label>
                    
    </div>
            
        </div>
        </div>
        
    );
}

FilterUser.protoTypes = {
    modifyFilter: PropTypes.func.isRequired,
    
}

export default FilterUser;
