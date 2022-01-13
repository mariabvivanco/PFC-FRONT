import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import React, { useState, useReducer,} from 'react';
import Notfoundpage from './pages/404/NotFoundPage';
import Loginpage from './pages/auth/LoginPage';
import Student from './pages/student';
import Userstudent from './pages/userstudent';
import { ERROR, INITIAL_STATE, LOGIN, LoginReducer, REGISTER, SUCCESS, RESET_ERRORS, TOKEN } from "./reducers/LoginReducer";
import { login, register } from './services/loginService';

export const appContext = React.createContext([]);

function App() {
  /*Nuevo*/
  const [ searchTerm, setSearchTerm ] = useState('');
	const [ state, dispatch ] = useReducer(LoginReducer, INITIAL_STATE);
	const { isLogged } = state;
  const history = useHistory();

	const tryLogin = (e, email, password) => {
		e.preventDefault();
		dispatch({type: RESET_ERRORS});
		if(email === '' || password === '') {
			dispatch({type: ERROR, payload: {error: 'Los campos correo electrónico y/o contraseña no pueden estar vacíos'}});
		} else {
			dispatch({type: LOGIN});
			login(email, password)
			.then(response => {
				if(response.status === 200 && response.data.token) {
					const token = response.data.token;
					localStorage.setItem("login_data", JSON.stringify({email, token: token}));
					dispatch({type: TOKEN, payload: {token: token}})
					dispatch({type: SUCCESS});
					history.push('/');
				} else {
					dispatch({type: ERROR, payload: {error: 'Error al iniciar sesión. Inténtalo de nuevo o más tarde.'}});
				}
			}).catch(error => dispatch({type: ERROR, payload: {error: 'Error al iniciar sesión: ' + error}}));
		}
	}
  
  
  return (
    <appContext.Provider value={state}>
    <Router>
      
    {/* Route Switch */}
    <Switch>
      {/* Redirections to protect our routes */}
      <Route exact path='/'> {!isLogged ?
         <Redirect from='/' to='/login' />:
         <Redirect from='/' to='/userstudent' />}</Route>
      <Route exact path='/login' > <Loginpage tryLogin={tryLogin}/> </Route>
      <Route exact path='/userstudent' ><Userstudent/> </Route>
      <Route exact path='/studentfile' ><Student/></Route>
      <Route component={Notfoundpage}/>
    </Switch>
  </Router>
  </appContext.Provider>
);
}
 

export default App;
