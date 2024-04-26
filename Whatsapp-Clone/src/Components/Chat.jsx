import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import plus from "../assets/plus.png";
import whatsapp from "../assets/whatsapp.png";
import team from "../assets/team.png";
import powerButton from "../assets/power-button.png";
import search from "../assets/search.png";
import axios from "axios";
import UserList from "./UserList";
import ChatSection from "./ChatSection";

const Chat = (props) => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [userData, setUserData] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [boolean, setBoolean] = useState(false);
  const [grpBoolean, setGrpBoolean] = useState(false);
  const [userList, setUserList] = useState([]);
  const [active, setActive] = useState("");
  const [activeName, setActiveName] = useState("");
  const [friend, setFriend] = useState("");
  let nav = useNavigate();

  let getUserList = () => {
    axios
      .post("../../getUsers", { id: data.id })
      .then((response) => {
        setFriend(response.data.obj);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .post("../../checkToken")
      .then(function (response) {
        console.log(response, "response");
        if (response.data === "Error") {
          nav("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    getUserList();
    axios.get("../../fetchData").then(function (response) {
      setUserData(response.data);
    });
    axios.get("../../fetchData").then((resp) => {
      setUserGroup(resp.data);
    });
  }, []);

  let getData = (e) => {
    for (let elem of userData) {
      if (boolean === false) {
        if (elem._id !== data.id) {
          setUserList((userList) => [...userList, elem]);
          setBoolean(true);
        }
      } else {
        setUserList([]);
        setBoolean(false);
      }
    }
  };

  let closeModal = (modal) => {
    if (modal === "boolean") {
      setBoolean(false);
    } else {
      setGrpBoolean(false);
    }
    setUserList([]);
  };

  let getGroup = () => {
    for (let elem of userGroup) {
      if (grpBoolean === false) {
        if (elem._id !== data.id) {
          setUserList((userList) => [...userList, elem]);
          setGrpBoolean(true);
        }
      } else {
        setUserList([]);
        setGrpBoolean(false);
      }
    }
  };

  let createRoom = (val) => {
    let obj = {
      user_id: data.id,
      friend_id: val._id,
      friendName: val.name,
      userName: JSON.parse(localStorage.getItem("data")).name,
    };
    axios
      .post("../../createRoom", obj)
      .then((response) => {
        // console.log(response.data);
        setFriend([...friend, response.data.newRoom]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let createGroup = (e) => {
    let input = e.target.previousElementSibling.value;
    if (input) {
      let childNode = e.target.parentNode.childNodes;
      let arr = [];
      for (let child of childNode) {
        if (child.id) {
          if (child.firstElementChild.checked) {
            arr.push(child.firstElementChild.id);
          }
        }
      }
      arr.push(data.id);
      let obj = {
        userId: arr,
        groupName: input,
      };
      axios
        .post("../../createRoom", obj)
        .then((response) => {
          console.log(response);
          setFriend([...friend, response.data.newRoom]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please Enter Group Name");
    }
  };

  const handleLogout = () => {
    axios
      .post("../../logout")
      .then((response) => {
        nav("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let callBack = (activeUser, activeUserName) => {
    setActive(activeUser);
    setActiveName(activeUserName);
  };
  return (
    <>
      <div className="mainChatSection">
        <div className="usersSection">
          <div className="chatHeader">
            <div className="UserAccount">
              <img src={whatsapp} alt="User Profile Pic" />
            </div>
            <div className="iconsGroup">
              <div className="createGroup">
                <img src={team} alt="User Profile Pic" onClick={getGroup} />
              </div>
              <div className="startOneChat">
                <img src={plus} alt="User Profile Pic" onClick={getData} />
              </div>
              <div className="logoutBtn" onClick={handleLogout}>
                <img src={powerButton} alt="User Profile Pic" />
              </div>
            </div>
          </div>

          <div className="chatSearchSection">
            <img src={search} alt="User Profile Pic" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="friendList">
            {friend !== "" ? (
              <>
                {
                  <UserList
                    friendData={friend}
                    currentUser={data.name}
                    setRoom={callBack}
                    socket={props.socket}
                  />
                }
              </>
            ) : null}
          </div>
        </div>
        {active !== "" ? (
          <>
            {
              <ChatSection
                userId={active}
                userName={activeName}
                socket={props.socket}
              />
            }
          </>
        ) : null}
      </div>

      {boolean === true ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal("boolean")}>
              &times;
            </span>
            <div className="availableUsers">
              {userList.map((val) => (
                <h3
                  className="availableFrnds"
                  key={val._id}
                  id={val._id}
                  onClick={() => createRoom(val)}
                >
                  {val.name}
                </h3>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {grpBoolean === true ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal("grpboolean")}>
              &times;
            </span>
            <div className="availableUsers">
              {userList.map((val) => {
                return (
                  <div key={val._id} id={val._id}>
                    <input type="checkbox" id={val._id} />
                    <label htmlFor={val._id} className="availableFrndsForGrp">
                      {val.name}
                    </label>
                  </div>
                );
              })}
              <input type="text" placeholder="Enter GroupName"></input>
              <button type="button" onClick={createGroup}>
                Create Group
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Chat;
