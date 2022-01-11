import {React, useContext, useState} from 'react';
import { BrowserRouter as  Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { appContext } from '../../../App';
import '../../../styles/loginFormix.css'



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

    const initialCredentials = {
        email: '',
        password: ''
    }
	
    const history = useHistory();

    const goRegister = (e) => {
		e.preventDefault();
		history.push('/register');
	};

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
                    history.push('/profile');
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
                                  name="email"
                                  placeholder="Introduce tu correo"
                                  value={email} 
                                  onChange={(e) => setEmail(e.currentTarget.value)} />
                                {/* Email Errors */}
                                {errors.email && touched.email && (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
                                )}
                            
                            </div>
                            <div class='row' id="password">
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <div class='row' >
                            <Field id="passwordinput"             
                                name="password"
                                placeholder="Introduce tu contraseña"
                                type='password'
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
                            
                            <div class="col col-sm-6" id="forgotten" >
                                He olvidado la contraseña
                            </div>
                            </div>
                            <div class="row">
                                <button id="login" type="submit"  onClick={(e) => {tryLogin(e, email, password)}} >Iniciar Sesión</button>
                                {isLogged ? (history.push("/userstudent")):null }
                            </div>
                            
                            
                        </Form>
                )}
            </Formik>
        </div>
    );
}

export default Loginformik;
