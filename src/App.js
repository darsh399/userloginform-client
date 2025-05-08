import LogInForm from './components/LogInForm';
import GreetingPage from './components/GreetingPage';
import SignUp from './components/SignUp';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
        <Routes>
            <Route path='/login' element={<LogInForm/>}/>
            <Route path='/' element={<SignUp/>}/>
            <Route path='/greet' element={<GreetingPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
