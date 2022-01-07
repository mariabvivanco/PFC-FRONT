import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Notfoundpage from './pages/404/NotFoundPage';
import Loginpage from './pages/auth/LoginPage';
import Student from './pages/student';
import Userstudent from './pages/userstudent';


function App() {
  
  return (
    <Router>
    {/* Route Switch */}
    <Switch>
      {/* Redirections to protect our routes */}
      <Route exact path='/'> (<Redirect from='/' to='/login' /> )
        
      </Route>
      
      <Route exact path='/login' > <Loginpage/> </Route>
      <Route exact path='/userstudent' ><Userstudent/> </Route>
      <Route exact path='/studentfile' ><Student/></Route>
      <Route component={Notfoundpage}/>
    </Switch>
  </Router>
);
}
 

export default App;
