import './App.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Profile from './Profile';
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <><LoginButton /><LogoutButton /><Profile /></>
 );
}

export default App;
