import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    let [username, updateUsername] = useState("")
    let [email, updateEmail] = useState("")
    let [phone, updatePhone] = useState("")
    let [password, updatePassword] = useState("")

    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // alert user
        setError("")
        setSuccess("")
        setLoading("Submitting data, please wait...");
        console.log(username, email, phone, password)

        // try send data to back end api
        try {
            // create form data
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            const response = await axios.post("https://quincyj.alwaysdata.net/api/signup", user_data)
            console.log(response);

            setSuccess(response.data.message);
            setLoading("");


        } catch (error) {
            console.log(error);
            setLoading('')
            setError(error.message)

        }
    }
    return(
        <div>
            <Navbar/>
            <div className="row justify-content-center">
                <div className="col-md-6 card shadow mt-5">
                    <h2>Sign Up</h2>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-danger">{error}</h5>
                    <h5 className="text-success">{success}</h5>
                    <form onSubmit={handleSubmit}>
                       <input type="text" placeholder="Enter Username" className="form-control" value={username} onChange={(e) => updateUsername(e.target.value)} />
                       <br />
                       <input type="password" placeholder="Enter Password" className="form-control" value={password} onChange={(e) => updatePassword(e.target.value)} />
                        <br />
                       <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e) => updateEmail(e.target.value)} />
                        <br />
                       <input type="tel" placeholder="Enter Phone Number" className="form-control" value={phone} onChange={(e) => updatePhone(e.target.value)} />
                        <br />
                        <button type="submit" className="btn btn-primary mb-3">Sign Up</button>
                        <br/>
                        <Link to="/signin">Already have an account? Sign In</Link>
                        <br/>
                    </form>
                </div>
            </div>      
        </div>
    )
}
export default SignUp;