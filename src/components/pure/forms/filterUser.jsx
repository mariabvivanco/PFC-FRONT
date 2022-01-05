/**
 * Componente que va a contener un formulario para
 * autenticación de usuarios.
 */

import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import "../../../styles/filterUser.css"

const FilterUser = () => {

    

    return (
        <div>
            
             <div class="row" id="general">
                
                <div class="row">
                    <div class="col col-sm-10">                            
                        <p id="title" >Filtros de Busqueda</p>
                    </div>
                    <div class="col col-sm-2">
                        <i id="trash" className='bi-trash task-action' onClick={() => (Alert("Eliminar Filtros"))}></i> 
                    </div>

                </div>
                
                <div class="row">
                    <p id="tags">Etiquetas</p>
                    <select id="select">
                        <option value="" disabled selected hidden>Escriba para buscar</option>
                    </select>
                    
                        <button id="tag" type="button" value="HTML$CSS" data-role="tagsinput">HTML$CSS</button>
                        <button id="tag" type="button" value="REACT" data-role="tagsinput">REACT</button><br/>
                        <button id="tag" type="button" value="ANGULAR" data-role="tagsinput">ANGULAR</button>
                                     
                    <p id="country" >País</p>
                    <select id="selectcountry" >
                        <option>
                            España
                        </option>
                    </select>
                    
                    <p id="city" >Ciudad</p>
                    <select id="selectcity" >
                        <option>
                            Valencia
                        </option>
                    </select>
                     
                    <p >Presencial/ a distancia</p>
                    <label>
                        <input id="check" type="checkbox" />
                            Presencial
                    </label>
                    <label>
                        <input id="check" type="checkbox" />
                            A Distancia
                    </label>
                    
                     
                    <p >Posibilidad de Traslado</p>
                    <label>
                        <input id="check" type="checkbox" />
                            Si
                    </label>
                    <label>
                        <input id="check" type="checkbox" />
                            No
                    </label>
                    
    </div>
            
        </div>
        </div>
        
    );
}

export default FilterUser;
