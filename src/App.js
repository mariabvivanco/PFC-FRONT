import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/auth/LoginPage';
import Userstudent from './pages/userstudent';
import FilterUser from './components/pure/forms/filterUser';
import Student from './pages/student';

function App() {
  return (
    <div className="App">
      {/*<Loginpage></Loginpage>*/}
      {/*<Userstudent></Userstudent>*/}
      <Student></Student>
      
    </div>
  );
}

export default App;
