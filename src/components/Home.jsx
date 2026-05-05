import ButtonScrollGroup from "./ButtonScrollGroup";
import Navbar from "./Navbar";

const Home = () => {
    return(
        <div>
            <Navbar/>
            <h1>Welcome to the Naborly App</h1>
            <p>This is a simple application for buying and selling second-hand items among people in the same neighborhood.</p>
            <ButtonScrollGroup/>
        </div>
    )
}
export default Home;