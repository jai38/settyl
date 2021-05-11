import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
export const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState();
  const [constUsers, setConstUsers] = useState();
  const [addUser, setAddUser] = useState(false);
  const [btnText, setBtnText] = useState("Add User");
  const handleData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await res.json();
    setUsers(json);
    setConstUsers(json);
  };
  useEffect(() => {
    handleData();
  }, []);
  const handleSearch = (value) => {
    setSearchValue(value);
    let reg = new RegExp(value, "i");
    let newUsers = JSON.parse(JSON.stringify(constUsers));
    newUsers = newUsers.filter((c) => c.name.match(reg));
    setUsers(newUsers);
  };
  const handleAddUser = () => {
    setAddUser((pre) => !pre);
    let newUsers = users;
    if (!addUser) {
      setBtnText("Cancel");
      let newUser = {
        id: users.length,
        address: {},
        company: {},
      };
      newUsers.unshift(newUser);
      setUsers(newUsers);
    } else {
      setBtnText("Add User");
      let newUsers = users;
      if (!newUsers.name && !newUsers.email) {
        newUsers.shift();
        setUsers(newUsers);
      }
    }
  };
  const deleteUser = (id) => {
    if (id == users.length - 1) {
      console.log(id);
      setBtnText("Add User");
      setAddUser(false);
    }
    let newUsers = JSON.parse(JSON.stringify(users));
    newUsers = newUsers.filter((user) => user.id != id);
    setUsers(newUsers);
    setConstUsers(newUsers);
  };
  const handleNewUser = (user) => {
    let newUsers = JSON.parse(JSON.stringify(users));
    newUsers.shift();
    newUsers.unshift(user);
    setUsers(newUsers);
    setConstUsers(newUsers);
    setBtnText("Add User");
    setAddUser(false);
  };
  return (
    <div>
      <Header
        getSearch={handleSearch}
        addUser={handleAddUser}
        addUserStatus={addUser}
        btnText={btnText}
      />
      <Main
        users={users}
        deleteUser={deleteUser}
        addUserStatus={addUser}
        getNewUser={handleNewUser}
      />
      <Footer />
    </div>
  );
};
