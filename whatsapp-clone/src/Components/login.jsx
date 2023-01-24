import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = () => {
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  // export const  [respData,setRespData] = useState("");
  let nav = useNavigate()
  
  let  checkData = (e,props) => {
    e.preventDefault()
    let obj = {
        username:props.user,
        password:props.pass
    }
    axios.post('../../checkData',obj)
    .then(response =>{
        if(response.data !== ""){
          axios.post('../../checkToken',obj)
          .then(response =>{
              if(response.data !== ""){
                console.log(response.data)
                localStorage.setItem('data',JSON.stringify(response.data))
                nav("/chat")
              }
              else{
                nav("/login")
                setUsername("")
                setPassword("")
                alert("Wrong Creditinals")
              }
          }).catch(error =>{ 
              console.log(error);
          })
        }
        else{
          nav("/login")
          setUsername("")
          setPassword("")
          alert("Wrong Creditinals")
        }
    }).catch(error =>{ 
        console.log(error);
    })
}

  let setUser = (e) => {
    setUsername(e.target.value)
  }
  let setPass = (e) => {
    setPassword(e.target.value)
  }
  return ( 
    <>
    <form onSubmit={(e)=>checkData(e,{user:username,pass:password})}>
      <input type = "text" name = "username" placeholder='Username' value={username} onChange = {setUser}/>
      <input type = "password" name = "password" placeholder='Password' value={password} onChange = {setPass}/>
      <button type='submit' value='Submit'>Submit</button>
    </form>
    </>
  )
}
export default Login