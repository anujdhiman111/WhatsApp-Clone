import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const[fullName,setFullname] = useState("");
  const[userName,setUsername] = useState("");
  const[password,setPassword] = useState("");
  let nav = useNavigate()

  let sendData = (e,props) => {
    e.preventDefault()
    // console.log(props.user,props.pass,props.name)
    let obj = {
        name:props.name,
        username:props.user,
        password:props.pass
    }
    axios.post('../../addUser',obj)
    .then(response =>{
        if(response.data !== ""){
          nav("/signUp")
          setUsername("")
          setPassword("")
          setFullname("");
          alert("UserName should be unique")
        }
        else{
            nav("/login")
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

  let setName = (e) => {
    setFullname(e.target.value)
  }



  return (
    <form onSubmit={(e)=>sendData(e,{user:userName,name:fullName,pass:password})}>
      <input type = "text" name = "fullName" placeholder='Full Name' value={fullName} onChange={setName}/>
      <input type = "text" name = "username" placeholder='Email or Username' value={userName} onChange={setUser}/>
      <input type = "password" name = "password" placeholder='Password' value={password} onChange={setPass}/>
      <button type='submit' value='Submit'>Submit</button>
    </form>
  )
}

export default SignUp