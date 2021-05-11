import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, FormControl, Row } from "react-bootstrap";
const getSplited = (users, range) => {
  let splitedUsers = [];
  while (users.length > 0) {
    splitedUsers.push(users.splice(0, range));
  }
  return splitedUsers;
};
export const Main = ({ users, deleteUser, addUserStatus, getNewUser }) => {
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const websiteRef = useRef();
  const companyRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const zipcodeRef = useRef();
  const [mobile, setMobile] = useState(window.innerWidth <= 550);
  const handleDevice = () => {
    if (window.innerWidth <= 550) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleDevice);
  }, []);
  const styleMobile = {};
  const styleDesktop = {
    col: {
      maxWidth: "30%",
    },
  };
  let styles = styleDesktop;
  if (mobile) {
    styles = styleMobile;
  }
  const addNewUser = (id) => {
    let newUser = {
      id: id,
      name: nameRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
      website: websiteRef.current.value,
      phone: phoneRef.current.value,
      company: {
        name: companyRef.current.value,
      },
      address: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        zipcode: zipcodeRef.current.value,
      },
    };
    getNewUser(newUser);
  };
  let splitedUsers =
    users && getSplited(JSON.parse(JSON.stringify(users)), (mobile && 1) || 3);
  const showAll = (id) => {
    document.getElementById(`back-${id}`).style.display = "block";
    document.getElementById(`front-btn-${id}`).style.display = "none";
  };
  const showLess = (id) => {
    document.getElementById(`back-${id}`).style.display = "none";
    document.getElementById(`front-btn-${id}`).style.display = "flex";
    // document.getElementById(`back-btn-${id}`).style.display = "block";
  };
  let first = true;
  const createRow = (users) => {
    return <Row>{users.map(createCard)}</Row>;
  };
  const createCard = (user, index) => {
    if (index == 0 && first && addUserStatus) {
      first = false;
      return (
        <Col style={{ ...styles.col }} className="m-3">
          <Card className="shadow p-3 mb-3 bg-light rounded">
            <Card.Header
              className="d-flex justify-content-center shadow p-3 mb-3 rounded h4"
              style={{ backgroundColor: "#cccccc" }}
            >
              <FormControl
                type="text"
                ref={nameRef}
                className="w-50 m-2"
                placeholder="Name"
                required
              />
            </Card.Header>
            <Card.Body>
              <div id="front">
                <div>
                  <FormControl
                    type="text"
                    ref={usernameRef}
                    className="m-2"
                    placeholder="Username"
                    required
                  />
                </div>
                <div>
                  <FormControl
                    type="text"
                    ref={emailRef}
                    className="m-2"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <FormControl
                    type="text"
                    ref={websiteRef}
                    className="m-2"
                    placeholder="Website"
                    onChange={() => {
                      showAll(user.id);
                    }}
                    required
                  />
                </div>
                <div
                  id={`front-btn-${user.id}`}
                  style={{ display: "flex" }}
                  className="justify-content-between mt-3"
                >
                  <button
                    className="btn btn-secondary"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => showAll(user.id)}
                  >
                    More
                  </button>
                </div>
              </div>
              <div id={`back-${user.id}`} style={{ display: "none" }}>
                <div>
                  <FormControl
                    type="text"
                    ref={companyRef}
                    className="m-2"
                    placeholder="Company"
                    required
                  />
                </div>
                <div>
                  <FormControl
                    type="text"
                    ref={phoneRef}
                    className="m-2"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div>
                  Address:
                  <div>
                    <FormControl
                      type="text"
                      ref={streetRef}
                      className="m-2"
                      placeholder="Street"
                      required
                    />
                  </div>
                  <div>
                    <FormControl
                      type="text"
                      ref={cityRef}
                      className="m-2"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <FormControl
                      type="Number"
                      ref={zipcodeRef}
                      className="m-2"
                      placeholder="Zipcode"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="mt-3 btn btn-secondary"
                    id={`back-btn-${user.id}`}
                    onClick={() => addNewUser(user.id)}
                  >
                    {"submit"}
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    }
    return (
      <Col style={{ ...styles.col }} className="m-3">
        <Card className="shadow p-3 mb-3 bg-light rounded">
          <Card.Header
            className="d-flex justify-content-center shadow p-3 mb-3 rounded h4"
            style={{ backgroundColor: "#cccccc" }}
          >
            {user.name}
          </Card.Header>
          <Card.Body>
            <div id="front">
              <div>Username: {user.username}</div>
              <div>Email: {user.email}</div>
              <div>website: {user.website}</div>
              <div
                id={`front-btn-${user.id}`}
                style={{ display: "flex" }}
                className="justify-content-between mt-3"
              >
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => showAll(user.id)}
                >
                  More
                </button>
              </div>
            </div>
            <div id={`back-${user.id}`} style={{ display: "none" }}>
              <div>Company: {user.company.name}</div>
              <div>Phone: {user.phone}</div>
              <div>
                Address:
                <div>Street: {user.address.street}</div>
                <div>City: {user.address.city}</div>
                <div>Zipcode: {user.address.zipcode}</div>
              </div>
              <button
                className="btn btn-secondary"
                style={{ position: "relative", left: "80%" }}
                id={`back-btn-${user.id}`}
                onClick={() => showLess(user.id)}
              >
                {(user.name && "Less") || "submit"}
              </button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };
  return <Container>{splitedUsers && splitedUsers.map(createRow)}</Container>;
};
