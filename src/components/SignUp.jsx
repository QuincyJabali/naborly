import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    // Changed let to const (Best Practice)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const navigate = useNavigate(); // Initialize navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading("Submitting data, please wait...");

        try {
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            const response = await axios.post("https://quincyj.alwaysdata.net/api/signup", user_data);
            
            setLoading("");
            setSuccess(response.data.message);

            // Redirect to Sign In after 2 seconds so they can see the success message
            setTimeout(() => {
                navigate("/signin");
            }, 2000);

        } catch (err) {
            setLoading("");
            // Improved error catching for network or server issues
            setError(err.response?.data?.message || "An error occurred during signup.");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="row justify-content-center">
                <div className="col-md-5 card shadow mt-5 p-4">
                    <h2 className="text-center mb-4">Create Account</h2>
                    
                    {loading && <div className="alert alert-warning">{loading}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" placeholder="Username" className="form-control" 
                                value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        
                        <div className="mb-3">
                            <input type="email" placeholder="Email Address" className="form-control" 
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <input type="tel" placeholder="Phone Number (e.g. 07...)" className="form-control" 
                                value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <input type="password" placeholder="Password" className="form-control" 
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading !== ""}>
                            {loading ? "Registering..." : "Sign Up"}
                        </button>
                        
                        <div className="text-center">
                            <Link to="/signin" className="text-decoration-none">Already have an account? Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>      
        </div>
    );
}

export default SignUp;