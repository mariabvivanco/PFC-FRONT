import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../../styles/loginFormix.css'



const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
        password: Yup.string()
                .required('Password is required')
    }
);


const Loginformik = () => {

    const initialCredentials = {
        email: '',
        password: ''
    }

    const history = useHistory();

    return (
        <div>
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
                        <Form className='form'>
                            
                            <div class='row' >
                                <label id="email" for="exampleInputEmail1" >Email</label>
                            </div>
                            <div class='row'>
                                <Field id="emailinput" type="email" name="email" placeholder="Introduce tu correo"  />
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
                                <div class="col col-sm-1">
                                    <div class="form-check">
                                    <Field type="checkbox" class="form-check-input" id="exampleCheck1" ></Field>
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
                                <button type="submit" id="login" style={{ borderRadius : '8px' }  }>Iniciar Sesión</button>
                                {isSubmitting ? (<p
                                ><Redirect from='/login' to='/userstudent' /></p>):null }
                            </div>
                            
                            
                        </Form>
                )}
            </Formik>
        </div>
    );
}

export default Loginformik;
