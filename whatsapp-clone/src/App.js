import './App.css';
import Home from './Components/home';
import Login from './Components/login'
import SignUp from './Components/signUp'
import Chat from './Components/Chat';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/signUp" element = {<SignUp/>}/>
                    <Route path = "/chat" element = {<Chat/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
