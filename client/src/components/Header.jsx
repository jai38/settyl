import React, { useEffect, useState } from "react";

export const Header = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 420);
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
  console.log(mobile);
  return (
    <nav className="navbar navbar-dark bg-dark text-light d-flex justify-content-between">
      <div
        className="d-flex justify-content-between"
        style={{ ...styles.leftHeader }}
      >
        <div className="h2 mt-2">Settyl Test</div>
        <button className="btn btn-primary mt-2 mb-2">Add User</button>
      </div>
      <div className="m-0 p-0">
        <form className="form-inline">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ ...styles.searchInput, position: "relative" }}
          />
        </form>
      </div>
    </nav>
  );
};
