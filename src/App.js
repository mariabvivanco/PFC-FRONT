import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/auth/LoginPage';
import Userstudent from './pages/userstudent';
import FilterUser from './components/pure/forms/filterUser';
import Student from './pages/student';
import FormAddStudent from './components/pure/forms/formAddStudent';

function App() {
  return (
    <div className="App">
      {/*<Loginpage></Loginpage>*/}
      <Userstudent></Userstudent>
      {/*<Student></Student>*/}
      {/*<FormAddStudent></FormAddStudent>*/}
      
    </div>
  );
}

export default App;
