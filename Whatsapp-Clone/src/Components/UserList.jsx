import React from "react";

const UserList = (props) => {
  let newFriendData = props.friendData.map((i) => {
    i.name = i.name.replace(`${props.currentUser}`, "");
    i.name = i.name.replace(",", "");
    return i;
  });
  let showChat = (e) => {
    let name = e.target.childNodes[0].innerText;
    props.socket.emit("joinroomnew", e.target.id);
    props.setRoom(e.target.id, name);
    props.socket.emit("groupMsg", { groupId: e.target.id });
  };
  return (
    <>
      {newFriendData.reverse().map((i) => {
        return (
          <div
            onClick={showChat}
            key={i._id}
            id={i._id}
            className="friendNameSection"
          >
            <h1 className="friendName">{i.name}</h1>
          </div>
        );
      })}
    </>
  );
};

export default UserList;
