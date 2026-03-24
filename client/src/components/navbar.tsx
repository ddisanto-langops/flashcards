import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <div id="navbar-div">
            <nav id="navbar">
                <Link to={"/"} className='navbar-link'>Dashboard</Link>
                <Link to={"/create"} className='navbar-link'>Create</Link>
            </nav>
        </div>
    )
}