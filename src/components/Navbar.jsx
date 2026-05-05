import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/signin");
        window.location.reload(); 
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <span className="text-primary">Nabor</span>ly
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                    </div>

                    <div className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <>
                                {/* New "My Items" Link added here */}
                                <Link className="nav-link" to="/myitems">My Items</Link>
                                
                                <Link className="nav-link" to="/additem">Add Item</Link>
                                
                                <span className="nav-link text-info ms-lg-2">
                                    Hi, {user.username}
                                </span>
                                
                                <button 
                                    className="btn btn-outline-danger btn-sm ms-lg-3" 
                                    onClick={logout}
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link" to="/signin">Sign In</Link>
                                <Link className="btn btn-primary btn-sm ms-lg-3" to="/signup">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;