/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Loginformik from '../../components/pure/forms/loginFormik';


import '../../styles/Loginpage.css'

const Loginpage = ({tryLogin}) => {
    return (
        <div id="login" >
                        <div class="row" id="everybody">
                           
                            <div class="col-lg-4 col-md-6 col-sm-12 col-xl-4"> 
                            <div class="row" id='infor'>
                                    <div id="title">
                                        <h2 id="title">OpenBootcamp<span id="student">|Alumnos</span></h2>
                                                                                          
                                    </div>
                                    <div class= "row" id="form">
                                        <Loginformik>{tryLogin}</Loginformik>
                                    </div>

                                
                                </div>
                                <div class="row" >
                                    <div >
                                        <p id="copyright">
                                            Copyright © 2021 Open Bootcamp SL, Imagina Group <br />
                                            Todos los derechos reservados. <br />
                                            <span><a  id="privacity" href="https://campus.open-vitae.com/"  >Política de Privacidad</a></span>
                                        </p>
                                    </div>
                    
                                </div> 
                            </div>
                            <div class="col-lg-8 col-md-6 col-sm-0 col-xl-8" id="image">
                               

                            </div>
                        </div>
                        </div> 
                        
    );
}

export default Loginpage;
