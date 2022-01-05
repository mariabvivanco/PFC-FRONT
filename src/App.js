import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/auth/LoginPage';
import Userstudent from './pages/userstudent';
import FilterUser from './components/pure/forms/filterUser';

function App() {
  return (
    <div className="App">
      {/*<Loginpage></Loginpage>*/}
      <Userstudent></Userstudent>
      
    </div>
  );
}

export default App;
