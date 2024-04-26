import "./App.css";
import Home from "./Components/home";
import Login from "./Components/login";
import SignUp from "./Components/signUp";
import Chat from "./Components/Chat";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:5001/");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
