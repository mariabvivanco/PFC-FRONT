/* eslint-disable no-restricted-globals */

import React, { useState, useRef } from 'react';
import "../../../styles/filterUser.css"
import PropTypes from 'prop-types';

const FilterUser = ({modifyFilter,tagsOption}) => {
    
   
    //const tagsoption = ["HTMLyCSS","SPRING","PHP","JAVA","PYTHON","REACT","ANGULAR" ]
    const listoption = new Array(tagsOption.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    
    
   
    const [tags, setTags] = useState([]);
    
    const inputRef = useRef(null);
    const cityRef = useRef();
    const countryRef = useRef();
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
        setTags(tempTags);
        modifyFilter('*','*','*',tempTags,'*')
    }

    function addTag(tag){
        var duplic = false;
        var exist= false;


        for (var i=0; i<tagsOption.length&&!exist;i++){
            if (tagsOption[i]===tag)
                exist=true;

        }

        for (i=0; i<tags.length&&!duplic;i++){
            if (tags[i]===tag)
                duplic=true;

        }

        if (exist&&!duplic){
            console.log('ADD this Task:', tag);
            const tempTags = [...tags];
            tempTags.push(tag);
            setTags(tempTags);
            modifyFilter('*','*','*',tempTags,'*')
            inputRef.current.value="";
        }
        
    }

    function modifPres() {
        modifyFilter('*','*',(presRef.current.checked?"Face_to_face":null),'*','*');
        if (remoteRef.current.checked) 
            remoteRef.current.checked=false;
    }

    function modifRem() {
        modifyFilter('*','*',(remoteRef.current.checked?"Remote":null),'*','*');
        if (presRef.current.checked) 
            presRef.current.checked=false;
    }

    function modifTransfYes() {

        modifyFilter('*','*','*','*',(traslateRef.current.checked?true:null));
        if (notransfRef.current.checked) 
            notransfRef.current.checked=false;
       }

    function modifTransfNo() {

        modifyFilter('*','*','*','*',(notransfRef.current.checked?false:null));
        if (traslateRef.current.checked) 
            traslateRef.current.checked=false;
       }
    function deleteFilter() {

        modifyFilter(null,null,null,null,null);
        notransfRef.current.checked=false;
        traslateRef.current.checked=false;
        presRef.current.checked=false;
        remoteRef.current.checked=false;
        cityRef.current.value='';
        countryRef.current.value=''
    }

    

    return (
        <div>
            
             <div class="row" id="general">
                
                <div class="row">
                    <div class="col col-sm-10">                            
                        <p id="title" >Filtros de Busqueda</p>
                    </div>
                    <div class="col col-sm-2">
                        <i id="trash" className='bi-trash task-action' onClick={() => {deleteFilter()}}></i> 
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
                                     
                    <p id="country"  >País</p>
                    <select id="selectcountry" ref={countryRef} onChange={
                        event => {
                        modifyFilter('*',event.target.value,'*','*','*')}}>
                        <option id="example" value="" disabled selected hidden >Elige un país</option>
                        <option>
                            España
                        </option>
                        <option>
                            Cuba
                        </option>
                    </select>
                    
                    <p id="city" >Ciudad</p>
                    <select   id="selectcity" ref={cityRef} onChange={
                        event => {
                        modifyFilter(event.target.value,'*','*','*','*')}}>
                        <option id="example" value='' >Elige una ciudad</option>
                        <option>
                            Valencia
                        </option>
                        <option>
                            Madrid
                        </option>
                    </select>
                     
                    <p >Presencial/ a distancia</p>
                    <label>
                        <input id="check" type="checkbox" ref={presRef} value="true"
                        
                          onClick={()=>modifPres()} />

                            Presencial
                    </label>
                    <label>
                        <input id="check" type="checkbox" ref={remoteRef}
                            onClick={()=>modifRem()}
                          />
                            A Distancia
                    </label>
                    
                    
                     
                    <p >Posibilidad de Traslado</p>
                    <label>
                        <input id="check" type="checkbox" ref={traslateRef} onClick={()=>modifTransfYes()} />
                            Si
                    </label>
                    <label>
                        <input id="check" type="checkbox" ref={notransfRef} onClick={()=>modifTransfNo()} />
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
