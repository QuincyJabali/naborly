import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import AddItem from './components/AddItem';
import MyItems from "./components/MyItems";
function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/> } />
          <Route path="/signin" element={<SignIn/> } />
          <Route path="/" element={<Home/> } />
          <Route path="/additem" element={<AddItem/>} />
          <Route path="/myitems" element={<MyItems />} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
