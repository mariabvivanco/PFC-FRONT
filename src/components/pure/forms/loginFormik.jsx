import {React, useContext, useState, useRef} from 'react';
import { BrowserRouter as  Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { appContext } from '../../../App';
import '../../../styles/loginFormix.css'
import FormForgot from './formForgot';
import {forgot as forgotAxios} from "../../../services/loginService"



const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Formato de email no válido')
                .required('Email es requerido'),
        password: Yup.string()
                .required('Contraseña es requerida')
    }
);


const Loginformik = ({tryLogin}) => {

    const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { isLoading, isLogged, error } = useContext(appContext);
    const[forgotPassword, setForgot] = useState(false);
    const[emailValid, setEmailv] = useState(true);
    const[emailEmpty, setEmailEmpty] = useState(true);
    const inputEmail = useRef();
    const inputPassword = useRef();
    const [alert, setAlert] = useState(false);

    const initialCredentials = {
        email: '',
        password: ''
    }
	
    const history = useHistory();

    const goRegister = (e) => {
		e.preventDefault();
		history.push('/register');
	};


    const forgotFuntion = () => {
        forgotAxios(email).then(response => {
            if(response.status === 200) {
                             console.log("ok");
                             setForgot(true);
                             setEmailv(true);
                            } else {
                                console.log("error");
                                setEmailv(false);
                            }
                        })
        .catch(error => {console.log("otro error");
        setEmailv(false); })
        
    }

    return (
        <div className='form'>
                <Formik 
                // *** Initial values that the form will take
               initialValues = { initialCredentials }
                // *** Yup Validation Schema ***
                validationSchema = {loginSchema}
                // ** onSubmit Event
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    // We save the data in the localstorage
                    await localStorage.setItem('credentials', values);
                    //history.push('/profile');
                }}
            >
                {/* We obtain props from Formik */}
                
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <Form  >
                            
                            <div class='row' >
                                <label id="email" for="exampleInputEmail1" >Email</label>
                            </div>
                            <div class='row'>
                                <Field id="emailinput"
                                  type="email"
                                  ref={inputEmail}
                                  name="email"
                                  placeholder="Introduce tu correo"
                                  
                                  value={email} 
                                  onChange={(e) => setEmail(e.currentTarget.value)}
                                  />
                                {errors.email && touched.email && (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
                                )}
                            
                            </div>
                            <div class='row' id="password">
                                <label >Contraseña</label>
                            </div>
                            <div class='row' >
                            <Field id="passwordinput"             
                                name="password"
                                placeholder="Introduce tu contraseña"
                                type='password'
                                ref={inputPassword}
                                value={password}
								onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && 
                                (
                                    <ErrorMessage name="password" component='div'></ErrorMessage>
                                )
                            }
                            </div>
                            <div class='row' id="otherdata">
                                <div class="col col-sm-1" id="check">
                                    <div class="form-check" id="check">
                                    < input id="check" type="checkbox"/>
                                    </div>
                                    </div>
                                    <div class="col col-sm-5">
                                    <label id="remember" class="form-check-label" for="exampleCheck1">Recuérdame</label>
                                </div>
                            
                            <div class="col col-sm-6" id="forgotten" onClick={()=> {
                                if (!email=="") {
                                    forgotFuntion()
                                    setEmailEmpty(true)
                                } else {
                                    setEmailEmpty(false)
                                    
                                }
                            }}>                                            
                                He olvidado la contraseña
                            </div>  
                                                      
                            </div>
                            <div class="row">
                                <button id="login" type="submit"  onClick={(e) => {
                                    if (email===""){
                                        
                                       setAlert(true);
                                    }
                                    else{
                                        
                                        tryLogin(e, email, password);
                                        isLogged ?  
                                        history.push("/userstudent") 
                                        : setAlert(true);}}} >Iniciar Sesión</button>
                                
                                
                            </div>
                            <div className='forgot'>
                                {forgotPassword && <div class="row">
                                    <FormForgot email={email}></FormForgot>
                                </div>}
                            <div>
                                {!emailValid&&<label>Introduzca un correo valido</label>}
                                {!emailEmpty&&<label>No ha introducido el correo</label>}
                            </div> 
                            {alert&&<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Error en tus credenciales!</strong> Repita el logueo.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" 
                                onClick={()=>setAlert(false)}></button>
                            </div>}

                            </div>
                           
                            
                            
                        </Form>
                )}
            </Formik>
        </div>
    );
}

export default Loginformik;
