import React, { useState } from "react";
const ChatSection = (props) => {
  const [message, setMessage] = useState("");
  const [userMsg, setUserMsg] = useState([]);
  let myData = JSON.parse(localStorage.getItem("data")).name;
  let setMessages = (e) => {
    setMessage(e.target.value);
  };
  let getMessage = (e) => {
    if (e.key === "Enter") {
      let newDate = new Date();
      let currTime = `${newDate.getHours()}:${newDate.getMinutes()}`;
      props.socket.emit("inputMessage", {
        groupId: props.userId,
        sentBy: JSON.parse(localStorage.getItem("data")).name,
        message: message,
        time: currTime,
      });
      setUserMsg([...userMsg, { message, sentBy: myData }]);
      setMessage("");
    }
  };
  props.socket.on("groupMsg", (allMsg) => {
    // console.log(allMsg);
  });
  props.socket.on("received", (msg) => {
    // console.log(msg);
    setUserMsg([...userMsg, msg.msg]);
  });
  props.socket.on("fetchMsg", (prevMsg) => {
    setUserMsg(prevMsg.msgData);
  });

  return (
    <>
      <div className="chatSection">
        <div className="chatSectionHeader">
          <div className="friendInfo">
            {/* <img src="#" alt="Friend Pic"></img> */}
            <h2 className="friendName">{props.userName}</h2>
          </div>
        </div>
        <div id="messageBox">
          {userMsg.length
            ? userMsg.map((val, idx) => {
                return (
                  <p
                    key={idx}
                    className={
                      val.sentBy === myData ? "myMessage" : "friendMsg"
                    }
                  >
                    {val.message}
                  </p>
                );
              })
            : null}
        </div>
        <div className="messageInputBox">
          <input
            id="inputMessage"
            placeholder="Type your message"
            onChange={setMessages}
            onKeyDown={getMessage}
            value={message}
          ></input>
        </div>
      </div>
    </>
  );
};
export default ChatSection;
