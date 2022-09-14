import './App.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import {Routes, Route, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';
import Profile from './Profile';
import Navbar from './Navbar';
import Video from './Video';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  var homepage;
  if(!isLoading){
    if(isAuthenticated){
      homepage = <HomePage />
    } 
    else{
      homepage = <LoginPage />
    }
  }


  return (
    
    <BrowserRouter>
    <Routes>
        <Route path='/' element={homepage} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/video' element={<Video />} />
    </Routes>
    </BrowserRouter>
 );
}

export default App;
