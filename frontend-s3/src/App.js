import './App.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import {Routes, Route, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';
import Profile from './Profile';
import Navbar from './Navbar';
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path='/' element={<LoginButton />} />
        <Route path='/profile' element={<Profile />} />
    </Routes>
    </BrowserRouter>
 );
}

export default App;
