import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false); // Changed to boolean for cleaner logic
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset states
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const user_data = new FormData();
            user_data.append("email", email);
            user_data.append("password", password);

            // POST to your Flask API
            const response = await axios.post("https://quincyj.alwaysdata.net/api/signin", user_data);
            
            setLoading(false);

            if (response.data.user) {
                // Save user details (user_id, username, etc.) to LocalStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                setSuccess("Login successful! Redirecting...");
                
                // Small delay so the user can see the success message before redirecting
                setTimeout(() => {
                    navigator("/");
                }, 1500);
            } else {
                // This catches the "Invalid credentials" message from Flask
                setError(response.data.message || "Login failed");
            }
        } catch (err) {
            setLoading(false);
            // Catch network errors or 500 server errors
            setError(err.response?.data?.message || "Server connection error. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="row justify-content-center">
                <div className="col-md-5 card shadow mt-5 p-4"> {/* Adjusted width for better UI */}
                    <h2 className="text-center">Sign In</h2>
                    
                    {/* Visual Feedback Alerts */}
                    {loading && <div className="alert alert-info">Please wait...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@gmail.com" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                placeholder="Enter Password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 mb-3" 
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                        
                        <div className="text-center">
                            <Link to="/signup" className="text-decoration-none">
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;