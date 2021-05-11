import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
export const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState();
  const [constUsers, setConstUsers] = useState();
  const [addUser, setAddUser] = useState(false);
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
      let newUser = {
        id: users.length,
        address: {},
        company: {},
      };
      newUsers.unshift(newUser);
      setUsers(newUsers);
    } else {
      let newUsers = users;
      if (!newUsers.name && !newUsers.email) {
        newUsers.shift();
        setUsers(newUsers);
      }
    }
  };
  return (
    <div>
      <Header
        getSearch={handleSearch}
        addUser={handleAddUser}
        addUserStatus={addUser}
      />
      <Main users={users} addUserStatus={addUser} />
      <Footer />
    </div>
  );
};
