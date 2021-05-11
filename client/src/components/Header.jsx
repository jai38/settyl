import React, { useEffect, useRef, useState } from "react";

export const Header = ({ getSearch, addUser }) => {
  const [mobile, setMobile] = useState(window.innerWidth <= 420);
  const [btnText, setBtnText] = useState("Add User");
  const searchRef = useRef();
  const handleDevice = () => {
    if (window.innerWidth <= 420) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleDevice);
  }, []);
  const styleMobile = {
    searchInput: {
      width: "45%",
      left: "50%",
    },
    leftHeader: {
      flexDirection: "column",
    },
  };
  const styleDesktop = {
    searchInput: {
      left: "5%",
      width: "80%",
    },
    leftHeader: {
      width: "18%",
    },
  };
  let styles = styleDesktop;
  if (mobile) {
    styles = styleMobile;
  }
  return (
    <nav
      className="navbar navbar-dark text-light d-flex justify-content-between"
      style={{
        backgroundColor: "#404040",
        position: "sticky",
        top: "0px",
        zIndex: 1,
      }}
    >
      <div
        className="d-flex justify-content-between text-center"
        style={{ ...styles.leftHeader }}
      >
        <div className="h2 m-2">Settyl Test</div>
        <button
          className="btn btn-primary mt-2 mb-2"
          onClick={() => {
            if (btnText == "Cancel") {
              setBtnText("Add User");
            } else {
              setBtnText("Cancel");
            }
            addUser();
          }}
        >
          {btnText}
        </button>
      </div>
      <div className="m-0 p-0">
        <form className="form-inline">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={searchRef}
            onChange={() => getSearch(searchRef.current.value)}
            style={{ ...styles.searchInput, position: "relative" }}
          />
        </form>
      </div>
    </nav>
  );
};
