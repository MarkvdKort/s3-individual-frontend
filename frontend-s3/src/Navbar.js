import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <nav className="Navbar">
        <Link to="/">HomePage</Link>
        <Link to="/profile">Profile</Link> <br />
        <Link to="/video">Video</Link>
        </nav>

    )
}
export default Navbar