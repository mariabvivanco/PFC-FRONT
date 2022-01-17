import {React, useState, useRef} from 'react';
import {verifyCode, changePassword} from "../../../services/loginService"

const FormForgot = (email) => {
    const [validate, setValidate] = useState(false)
    const [verifyC, setVerifyC] = useState(true)
    const [passwordEqual, setPasswordEquals] = useState(true)
    const codeRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();
    const [showForm, setShowForm ] = useState(true);

    


    
    return (
        showForm&&<div>
           { !validate&&<div>
                <label id="note">Se ha enviado un código a su dirección de correo electrónico</label>
                <label id="note">Por favor introducir:</label>
                <input id="forgot" type="text" ref={codeRef} placeholder='Introduce el código'></input>
                <div class="row"></div>
                <button id="forgot"  onClick={()=>
                    {verifyCode(email.email, codeRef.current.value)
                        .then(response => {
                            if(response.status === 200) {
                                setVerifyC(true);
                                setValidate(true)
                            } else {
                                
                                setVerifyC(false)
                                
                            }
                        })
                        .catch()
                    }}>Validar</button>
                <div class="row">
                    {!verifyC&&<label id="note">Código incorrecto</label>}
                </div>

            </div>}
            {validate &&<div>
                <label id="forgot">Nueva Contraseña</label> 
                <input id="forgot" ref={password1Ref} type="text" placeholder='Introduce la nueva contraseña'></input>
                <label id="forgot">Repita la contraseña</label>
                <input id="forgot" ref={password2Ref} type="text" placeholder='Repite la contraseña'></input>
                <div class="row"></div>
                <button id="forgot"  onClick={()=>
                    { if (password1Ref.current.value===password2Ref.current.value){
                        changePassword(email.email,password1Ref.current.value)
                        .then(response =>{
                            if (response.status === 200){
                                setPasswordEquals(true);
                                setValidate(false);
                                setShowForm(false)
                            }
                        })
                        .catch(console.log("Ocurrió un error  de tipo cambiando la contraseña"))

                    }else{
                        setPasswordEquals(false);
                        setValidate(true)

                    }}}>




                        Cambiar</button>
                <div class="row">
                    {!passwordEqual&&<label id="note">Las contraseñas no coinciden</label>}
                </div>

            </div>}
           
            
            
        </div>
    );
}

export default FormForgot;
