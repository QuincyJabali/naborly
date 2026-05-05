import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");
    const navigator = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")
        setSuccess("")
        setLoading("Please wait...")

        try {
            // Create form data
            const user_data = new FormData();

            // add the email and password to user_data
            user_data.append("email", email);
            user_data.append("password", password);

            // use axios to send data to server and get response
            const response = await axios.post("https://quincyj.alwaysdata.net/api/signin", user_data)
            console.log(response);
            if (response.data.user) {
                setLoading("")
                setSuccess(response.data.message)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigator("/")
            }
            else {
                setLoading("")
                setError(response.data.message)
            }
        } catch (error) {
            setLoading("")
            setError(error.message)

        }

    }
    return(
        <div>
            <Navbar/>
            <div className="row justify-content-center">
                <div className="col-md-6 card shadow mt-5">
                    <h2>Sign In</h2>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-danger">{error}</h5>
                    <h5 className="text-success">{success}</h5>

                    <form onSubmit={handleSubmit}>

                       <input type="email" 
                       placeholder="Enter Email" 
                       className="form-control" 
                       value={email} 
                       onChange={(e) => setEmail(e.target.value)} 
                       />

                       <br />

                       <input type="password" 
                       placeholder="Enter Password" 
                       className="form-control" 
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)} 
                       />

                        <br />

                        <button type="submit" className="btn btn-primary mb-3">Sign In</button>
                        
                        <br/>
                        <Link to="/signup">Don't have an account? Sign Up</Link>
                        <br/>   
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignIn;