import ButtonScrollGroup from "./ButtonScrollGroup";
import Navbar from "./Navbar";

const Home = () => {
    return(
        <div>
            <Navbar/>
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple home page for the React application.</p>
            <ButtonScrollGroup/>
        </div>
    )
}
export default Home;