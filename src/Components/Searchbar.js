import { AppBar, Toolbar, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Searchbar({
  handleNotShowSearch,
  handleShowNav,
  handleTextToSearch,
  searchItem,
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
      if (window.innerWidth > 1200) {
        handleShowNav();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isSmallScreen && (
        <>
          <>
            <AppBar style={{ background: "transparent", position: "fixed" }}>
              <Toolbar className="sbar" style={{ backgroundColor: "none" }}>
                <Container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Link to="/searchcomponents">
                    <input
                      onChange={handleTextToSearch}
                      value={searchItem}
                      className="sbarI"
                      placeholder="Search"></input>
                  </Link>
                  <Link to="/searchpage">
                    <button
                      onClick={() => {
                        handleNotShowSearch();
                        handleShowNav();
                      }}
                      className="sbarb">
                      CANCEL
                    </button>
                  </Link>
                </Container>
              </Toolbar>
            </AppBar>
          </>
        </>
      )}
    </>
  );
}
