/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import {React, useEffect} from 'react';
import FormStudent from '../components/pure/forms/formStudent';

import '../styles/student.css'

const Student = () => {
    
   
       
    return (
        <div id="student" >
           
            <div class="row" id="firstrow">
                <div  class="col-10"  >
                    <button id="back">&#xf060;Volver</button>
                </div>
                <div  class="col-2">
                    <select id="username">
                        <option>UserName</option>
                    </select>

                </div>

            </div>

    
            <div class="row"  id="restrow">
        
                <div class="col-4" id="form" >
                    <FormStudent></FormStudent>
                
                </div>
        
        
                <div class="col-8">
                    <iframe id="visorname" src="http://cprmerida.juntaextremadura.net/manual.pdf" frameborder="0" height="700px" width="100%"></iframe>

                </div>
            </div>
                       
        </div> 
                        
    );
}

export default Student;
