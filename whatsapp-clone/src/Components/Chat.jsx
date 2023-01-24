import React, { useEffect, useState } from 'react'
import plus from '../assets/plus.png'
import whatsapp from '../assets/whatsapp.png'
import team from '../assets/team.png'
import powerButton from '../assets/power-button.png'
import search from '../assets/search.png'
import axios from 'axios'
// import UserList from './UserList'
// import ChatSection from './ChatSection'

const Chat = () => {
  const[data,setData] = useState("");
  const[userData,setUserData] = useState("");
  const[boolean,setBoolean] = useState(false)
  const[userList,setUserList] = useState([]);
  useEffect(()=>{
    axios
    .get("../../fetchData")
    .then(function (response) {
      setUserData(response.data);
    });
    setData(JSON.parse(localStorage.getItem('data')));
  },[])
  let getData = () =>{
    for(let elem of userData){
      if(elem._id !== data.id){
        console.log(elem.name);
        setUserList(userList=>[...userList,elem]);
        setBoolean(true)
      }
    }
    // console.log(userList)
  }

  let createRoom = (e) =>{
    console.log(e.target.id)
  }
  return (
    <>
      <div className='mainChatSection'>
        <div className='usersSection'>
          <div className='chatHeader'>
            <div className='UserAccount'>
              <img src={whatsapp} alt='User Profile Pic'/>
            </div>
            <div className='iconsGroup'>
              <div className='createGroup'>
                <img src={team} alt='User Profile Pic' />
              </div>
              <div className='startOneChat'>
                <img src={plus} alt='User Profile Pic' onClick={getData}/>
              </div>
              <div className='logoutBtn'>
                <img src= {powerButton} alt='User Profile Pic'/>
              </div>
            </div>
          </div>

          <div className='chatSearchSection'>
            <img src= {search} alt='User Profile Pic'/>
            <input type = "text" placeholder='Search'/>
          </div>

          {/* {<UserList/>} */}
        </div>
        {/* {<ChatSection/>} */}
      </div>
      {boolean === true ? 
        <div className='availableUsers'>
          {userList.map((val)=>{
            return(
              <li id={val._id} onClick = {createRoom}>{val.name}</li>
            )
          })}
        </div>:null}
    </>
  )
}

export default Chat