import { Link } from "react-router-dom"
import "./Styles/Navbar.css"
const Navbar = () => {
    return(
        <nav className="topnav">
        <Link to="/">HomePage</Link>
        <Link to="/profile">Profile</Link> 
        <Link to="/video">Video</Link>
        </nav>

    )
}
export default Navbar