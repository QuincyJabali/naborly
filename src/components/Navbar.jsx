import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
     let user = JSON.parse(localStorage.getItem("user"))
    let navigator = useNavigate()

    const logout = () => {
        localStorage.clear();
        navigator("/signin")
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">TBD</Link>
            <buttton className="navbar-toggler" data-bs-collapse="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>

            </buttton>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/" >Home</Link>
                </div>
                {user ?

                    <div className="navbar-nav ms-auto">
                         <Link className="nav-link" to="/additem">Add Item</Link>
                        <button className="nav-link" >{user.username}</button>
                        <button className="nav-link" onClick={logout}>Log Out</button>
                       
                    </div>

                    :


                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/signin">Sign In </Link>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </div>
                }
            </div>
        </nav>
    )
}
export default Navbar;