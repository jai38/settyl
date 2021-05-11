import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
const getSplited = (users, range) => {
  let splitedUsers = [];
  while (users.length > 0) {
    splitedUsers.push(users.splice(0, range));
  }
  return splitedUsers;
};
export const Main = ({ users, addUserStatus }) => {
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
  let splitedUsers =
    users && getSplited(JSON.parse(JSON.stringify(users)), (mobile && 1) || 3);
  const showAll = (id) => {
    document.getElementById(`back-${id}`).style.display = "block";
    document.getElementById(`front-btn-${id}`).style.display = "none";
  };
  const showLess = (id) => {
    document.getElementById(`back-${id}`).style.display = "none";
    document.getElementById(`front-btn-${id}`).style.display = "block";
    // document.getElementById(`back-btn-${id}`).style.display = "block";
  };
  const createRow = (users) => {
    return <Row>{users.map(createCard)}</Row>;
  };
  const createCard = (user) => {
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
              <button
                className="btn btn-primary"
                style={{ position: "relative", left: "80%" }}
                id={`front-btn-${user.id}`}
                onClick={() => showAll(user.id)}
              >
                More
              </button>
            </div>
            <div id={`back-${user.id}`} style={{ display: "none" }}>
              <div>
                Company: {user.company.name} - {user.company.catchPhrase}
              </div>
              <div>Phone: {user.phone}</div>
              <div>
                Address:
                <div>Street: {user.address.street}</div>
                <div>Suite: {user.address.suite}</div>
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
