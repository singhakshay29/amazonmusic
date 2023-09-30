import {
  Card,
  List,
  Button,
  AppBar,
  Toolbar,
  ListItem,
  InputBase,
  IconButton,
  Container,
} from "@mui/material";
import mini from "../assests/mini.png";
import { HiUser } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Navbar({
  searchItem,
  signSuccess,
  handleNotShow,
  setSignSuccess,
  handleShowSearch,
  handleTextToSearch,
  handleInputValueToSearch,
}) {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [isDropdownOpenUser, setIsDropDownOpenUser] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "rgb(37, 209, 218)" : "white",
    };
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  const toggleDropDownUser = () => {
    setIsDropDownOpenUser(!isDropdownOpenUser);
  };
  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("signupDeatils");
    setSignSuccess(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <>
          <AppBar
            className="appbar"
            style={{ background: "transparent", position: "fixed" }}>
            <Toolbar
              className="toolbar"
              style={{
                backgroundColor: "none",
              }}>
              <List className="nlist">
                <ListItem className="nl1">
                  <img src={mini} className="logoS" alt="amazon music" />
                </ListItem>
                <List className="nlist">
                  <ListItem className="nl2">
                    <NavLink to="/" style={navLinkStyle}>
                      <GoHomeFill className="i1" />
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink to="/podcasts" style={navLinkStyle}>
                      <PodcastsIcon className="i2" />
                    </NavLink>
                  </ListItem>
                  <ListItem className="i3">
                    <HeadphonesIcon
                      className="i3"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    {isDropdownOpen && (
                      <div
                        className="dropmusic d1 d2"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          backdropFilter: "blur(30px)",
                        }}>
                        <Link to="/trendingplaylist" onClick={toggleDropDown}>
                          <li
                            style={
                              {
                                // backgroundColor: "rgba(15, 17, 17, 0.3)",
                                // backdropFilter: "blur(60px)",
                              }
                            }
                            className="d1l1">
                            Music
                          </li>
                        </Link>
                        <NavLink to="/pod" style={{ color: "white" }}>
                          <ListItem
                            style={
                              {
                                // background: "rgba(15, 17, 17, 0.7)",
                                // backdropFilter: "blur(30px)",
                              }
                            }
                            className="d1l1">
                            Podcasts
                          </ListItem>
                        </NavLink>
                        {signSuccess ? (
                          <NavLink to="/favorites" style={{ color: "white" }}>
                            <ListItem
                              style={
                                {
                                  // background: "rgba(15, 17, 17, 0.7)",
                                  // backdropFilter: "blur(30px)",
                                }
                              }
                              className="d1l1">
                              Favorites
                            </ListItem>
                          </NavLink>
                        ) : (
                          <NavLink to="/notsignin" style={{ color: "white" }}>
                            <ListItem
                              style={
                                {
                                  // background: "rgba(15, 17, 17, 0.7)",
                                  // backdropFilter: "blur(30px)",
                                }
                              }
                              className="d1l1">
                              Favorites
                            </ListItem>
                          </NavLink>
                        )}
                      </div>
                    )}
                  </ListItem>
                  <ListItem>
                    <Link to="/searchpage">
                      <BiSearch
                        className="i4"
                        onClick={() => {
                          handleNotShow();
                          handleShowSearch();
                        }}
                      />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <AccountCircleIcon
                      className="i5"
                      onClick={toggleDropDownUser}
                    />
                    {isDropdownOpenUser && (
                      <>
                        <div className="dropuser">
                          {signSuccess ? (
                            <>
                              <Card
                                sx={{
                                  position: "absolute",
                                  left: -30,
                                  zIndex: 1,
                                }}>
                                <List
                                  style={{
                                    position: "fixed",
                                    border: "0.5px solid grey",
                                    width: "280px",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(15,17,17,.7)",
                                    zIndex: 1000,
                                    backdropFilter: "blur(30px)",
                                  }}>
                                  <Link
                                    to="/profile"
                                    style={{
                                      color: "white",
                                    }}>
                                    <ListItem
                                      style={{
                                        borderBottom:
                                          "solid rgba(255, 255, 255, 0.15)",
                                        height: "50px",
                                      }}>
                                      My Profile
                                    </ListItem>
                                  </Link>
                                  <Link to="/gethelp">
                                    <ListItem
                                      style={{
                                        borderBottom:
                                          "solid rgba(255, 255, 255, 0.15)",
                                        height: "50px",
                                        color: "white",
                                      }}>
                                      Get Help
                                    </ListItem>
                                  </Link>

                                  <Link to="/term" style={{ color: "white" }}>
                                    <ListItem
                                      style={{
                                        height: "50px",
                                        borderBottom:
                                          "solid rgba(255, 255, 255, 0.15)",
                                      }}>
                                      Terms & Conditions
                                    </ListItem>
                                  </Link>
                                  <Link
                                    to="/subscription"
                                    style={{ color: "white" }}>
                                    <ListItem
                                      style={{
                                        height: "50px",
                                        borderBottom:
                                          "solid rgba(255, 255, 255, 0.15)",
                                      }}>
                                      Subscription
                                    </ListItem>
                                  </Link>

                                  <ListItem
                                    onClick={() => logout()}
                                    style={{
                                      marginBottom: "15px",
                                      color: "white",
                                    }}>
                                    Sign Out
                                  </ListItem>
                                </List>
                              </Card>
                            </>
                          ) : (
                            <>
                              <Card
                                sx={{
                                  position: "absolute",
                                  left: -30,
                                  zIndex: 1,
                                }}>
                                <List
                                  style={{
                                    position: "fixed",
                                    border: "0.5px solid grey",
                                    minWidth: "250px",
                                    minHeight: "100px",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(15,17,17,.7)",
                                    zIndex: 1000,
                                    backdropFilter: "blur(30px)",
                                  }}>
                                  <Link to="/signin">
                                    <ListItem
                                      sx={{
                                        m: "1rem",
                                        justifyContent: "center",
                                        border: "2px solid transparent",
                                        "&:hover": {
                                          backgroundColor: "#a8edf0",
                                          fontSize: "16.5px",
                                          // width: "225px",
                                          border: "2px solid transparent",
                                          paddingLeft: "15px", // Increase padding on the left side
                                          paddingRight: "15px", // Increase padding on the right side
                                        },
                                        backgroundColor: "rgb(37, 209, 218)",
                                        borderRadius: "50px",
                                        paddingLeft: "20px", // Initial padding on the left side
                                        paddingRight: "20px", // Initial padding on the right side
                                        width: "220px",
                                        color: "black",
                                        "&:active": {
                                          // Add styles for the "active" state
                                          backgroundColor: "#a8edf0", // You can customize this color
                                          fontSize: "15px", // You can customize the font size
                                          width: "225px", // You can customize the width
                                        },
                                      }}>
                                      Sign In
                                    </ListItem>
                                  </Link>
                                </List>
                              </Card>
                              {/* <Link to="/signin">
                                <Button
                                  sx={{
                                    m: "1rem",
                                    border: "2px solid transparent",
                                    "&:hover": {
                                      backgroundColor: "#a8edf0",
                                      fontSize: "15px",
                                      width: "225px",
                                      border: "2px solid transparent",
                                    },
                                    backgroundColor: "rgb(37, 209, 218)",
                                    borderRadius: "50px",
                                    width: "220px",
                                    color: "black",
                                    "&:active": {
                                      // Add styles for the "active" state
                                      backgroundColor: "#a8edf0", // You can customize this color
                                      fontSize: "15px", // You can customize the font size
                                      width: "225px", // You can customize the width
                                    },
                                  }}>
                                  Sign In
                                </Button>
                              </Link>
                              <Link
                                to="/subscription"
                                style={{ color: "white" }}>
                                <ListItem>Subscription</ListItem>
                              </Link> */}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </ListItem>
                </List>
              </List>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar className="appbar" style={{ background: "transparent" }}>
            <Toolbar
              className="toolbar"
              style={{
                background: "none",
              }}>
              <List className="l">
                <ListItem sx={{ minWidth: "190px", paddingTop: "20px" }}>
                  <img
                    src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
                    alt="amazon music"
                    className="logoR"
                  />
                </ListItem>
                <NavLink to="/" style={navLinkStyle}>
                  <ListItem
                    sx={{
                      minWidth: "110px",
                      fontFamily: "unset",
                      fontWeight: 550,
                    }}>
                    <GoHomeFill
                      style={{
                        fontSize: "2.2rem",
                        paddingInlineEnd: "10px",
                      }}
                    />
                    HOME
                  </ListItem>
                </NavLink>
                <NavLink to="/pod" style={navLinkStyle}>
                  <ListItem
                    sx={{
                      minWidth: "160px",
                      fontFamily: "unset",
                      fontWeight: 500,
                    }}>
                    <PodcastsIcon
                      style={{ fontSize: "2.2rem", paddingInlineEnd: "10px" }}
                    />
                    PODCASTS
                  </ListItem>
                </NavLink>
                <ListItem
                  sx={{
                    minWidth: "170px",
                    fontFamily: "unset",
                    fontWeight: "500",
                    paddingBottom: "10px",
                  }}
                  onClick={toggleDropDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <HeadphonesIcon sx={{ mx: "0.5rem" }} />
                  LIBRARY
                  <KeyboardArrowDownIcon sx={{ mx: "0.5rem" }} />
                  {isDropdownOpen && (
                    <>
                      {/* <div
                        style={{
                          // position: "absolute",
                          border: "2px solid green",
                          // width: "280px",
                          // height: "400px",
                          marginTop: "50rem",
                          top: 45,

                          // position: "absolute",
                          width: "280px",
                          height: "300px",
                          backgroundColor: "transparent",

                          filter: "blur(30px)",
                          // border: "solid rgba(255, 255, 255, 0.15)",
                        }}
                        className="dropNav"></div>
                      <div></div> */}
                      <Card
                        sx={{
                          mt: "3rem",
                          position: "absolute",
                          top: "-10",
                          left: 30,
                          zIndex: 1,
                        }}>
                        <List
                          style={{
                            position: "fixed",
                            border: "0.5px solid grey",
                            width: "280px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(15,17,17,.7)",
                            zIndex: 1000,
                            backdropFilter: "blur(30px)",
                          }}>
                          <Link
                            to="/trendingplaylist"
                            style={{
                              color: "white",
                            }}
                            onClick={toggleDropDown}>
                            <ListItem
                              style={{
                                borderBottom: "solid rgba(255, 255, 255, 0.15)",
                                height: "50px",
                              }}>
                              Music
                            </ListItem>
                          </Link>
                          <Link to="/pod" style={{ color: "white" }}>
                            <ListItem
                              style={{
                                height: "50px",
                                borderBottom: "solid rgba(255, 255, 255, 0.15)",
                              }}>
                              Podcasts
                            </ListItem>
                          </Link>
                          {signSuccess ? (
                            <Link to="/favorites" style={{ color: "white" }}>
                              <ListItem style={{ marginBottom: "15px" }}>
                                Favorites
                              </ListItem>
                            </Link>
                          ) : (
                            <Link to="/notsignin" style={{ color: "white" }}>
                              <ListItem style={{ marginBottom: "15px" }}>
                                Favorites
                              </ListItem>
                            </Link>
                          )}
                        </List>
                      </Card>
                    </>
                  )}
                </ListItem>
                <Container sx={{ minWidth: "530px" }}>
                  <Container
                    sx={{
                      marginLeft: "18rem",
                      width: "220px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 2px",
                      backgroundColor: "#fff",
                      fontSize: "12px",
                    }}>
                    <Link to="/searchcomponents">
                      <InputBase
                        onChange={handleTextToSearch}
                        placeholder="Search..."
                        value={searchItem}
                        style={{
                          height: "10px",
                        }}
                      />
                    </Link>
                    <IconButton
                      style={{
                        padding: "1px",
                        background: "none",
                      }}>
                      <SearchIcon onClick={handleInputValueToSearch} />
                    </IconButton>
                  </Container>
                </Container>

                <ListItem>
                  <Button
                    sx={{
                      color: "white",
                      borderRadius: "50px",
                      height: "30px",
                      background: "rgba(255, 255, 255, 0.15)",
                    }}
                    onClick={() => toggleDropDownUser()}>
                    <HiUser
                      // style={{
                      //   width: "60px",
                      //   height: "35px",
                      //   borderRadius: "50px",
                      //   fontSize: "0.5rem",
                      //   // padding: "6px",
                      //   // hover: {
                      //   //   backgroundColor: "grey",
                      //   //   fontSize: "2rem",
                      //   // },
                      //   // "&:hover": {
                      //   //
                      //   //   // fontSize: "15px",
                      //   //   // width: "225px",
                      //   //   // paddingInlineStart: "5px",
                      //   //   // paddingInlineEnd: "5px",
                      //   //   // border: "2px solid transparent",
                      //   //   // width: "211px",
                      //   // },
                      //   backgroundColor: "rgba(255, 255, 255, 0.15)",
                      //   boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.16)",
                      // }}
                      style={{ fontSize: "1.4rem" }}
                      onClick={() => toggleDropDownUser()}
                    />
                  </Button>
                  {isDropdownOpenUser && (
                    <>
                      {/* <div
                        style={{
                          position: "fixed",
                          top: 60,
                          width: "250px",
                          height: "15vh",
                          backgroundColor: "rgba(15,17,17,.6)",
                          zIndex: 9,
                          backdropFilter: "blur(30px)",
                          border: "2px solid green",
                          left: "calc((100% - 24px) - 250px)", */}
                      {/* // display: "flex",
                          // flexDirection: "row",
                          // flexGrow: "1", */}
                      {/* }}></div> */}
                      <div className="dropuser">
                        {signSuccess ? (
                          <>
                            <Card
                              sx={{
                                position: "absolute",
                                left: -30,
                                zIndex: 1,
                              }}>
                              <List
                                style={{
                                  position: "fixed",
                                  border: "0.5px solid grey",
                                  width: "280px",
                                  borderRadius: "10px",
                                  backgroundColor: "rgba(15,17,17,.7)",
                                  zIndex: 1000,
                                  backdropFilter: "blur(30px)",
                                }}>
                                <Link
                                  to="/profile"
                                  style={{
                                    color: "white",
                                  }}>
                                  <ListItem
                                    style={{
                                      borderBottom:
                                        "solid rgba(255, 255, 255, 0.15)",
                                      height: "50px",
                                    }}>
                                    My Profile
                                  </ListItem>
                                </Link>
                                <Link to="/gethelp">
                                  <ListItem
                                    style={{
                                      borderBottom:
                                        "solid rgba(255, 255, 255, 0.15)",
                                      height: "50px",
                                      color: "white",
                                    }}>
                                    Get Help
                                  </ListItem>
                                </Link>

                                <Link to="/term">
                                  <ListItem
                                    style={{
                                      height: "50px",
                                      borderBottom:
                                        "solid rgba(255, 255, 255, 0.15)",
                                      color: "white",
                                    }}>
                                    Terms & Conditions
                                  </ListItem>
                                </Link>

                                <NavLink
                                  to="/subscription"
                                  style={{ color: "white" }}>
                                  <ListItem
                                    style={{
                                      height: "50px",
                                      borderBottom:
                                        "solid rgba(255, 255, 255, 0.15)",
                                    }}>
                                    Subscription
                                  </ListItem>
                                </NavLink>

                                <ListItem
                                  style={{
                                    height: "50px",
                                    color: "white",
                                  }}
                                  onClick={() => logout()}>
                                  Sign Out
                                </ListItem>
                              </List>
                            </Card>
                            {/* <ListItem>
                                <Card
                                  style={{
                                    backgroundColor: "rgba(15,17,17,.6)",
                                    color: "white",
                                    border: "1px solid grey",
                                    width: "120px",
                                    marginLeft: "50px",
                                    textAlign: "center",
                                  }}>
                                  Hey! {useName}
                                </Card>
                              </ListItem>

                              <Button
                                style={{
                                  margin: "1rem",
                                  border: "2px solid rgb(37, 209, 218)",
                                  backgroundColor: "rgb(37, 209, 218)",
                                  borderRadius: "50px",
                                  width: "220px",
                                  color: "black",
                                }}
                                onClick={() => logout()}>
                                LOG OUT
                              </Button> */}
                          </>
                        ) : (
                          <>
                            <Card
                              sx={{
                                position: "absolute",
                                left: -30,
                                zIndex: 1,
                              }}>
                              <List
                                style={{
                                  position: "fixed",
                                  border: "0.5px solid grey",
                                  minWidth: "250px",
                                  minHeight: "100px",
                                  borderRadius: "10px",
                                  backgroundColor: "rgba(15,17,17,.7)",
                                  zIndex: 1000,
                                  backdropFilter: "blur(30px)",
                                }}>
                                <Link to="/signin">
                                  <ListItem
                                    sx={{
                                      m: "1rem",
                                      justifyContent: "center",
                                      border: "2px solid transparent",
                                      "&:hover": {
                                        backgroundColor: "#a8edf0",
                                        fontSize: "16.5px",
                                        // width: "225px",
                                        border: "2px solid transparent",
                                        paddingLeft: "15px", // Increase padding on the left side
                                        paddingRight: "15px", // Increase padding on the right side
                                      },
                                      backgroundColor: "rgb(37, 209, 218)",
                                      borderRadius: "50px",
                                      paddingLeft: "20px", // Initial padding on the left side
                                      paddingRight: "20px", // Initial padding on the right side
                                      width: "220px",
                                      color: "black",
                                      "&:active": {
                                        // Add styles for the "active" state
                                        backgroundColor: "#a8edf0", // You can customize this color
                                        fontSize: "15px", // You can customize the font size
                                        width: "225px", // You can customize the width
                                      },
                                    }}>
                                    Sign In
                                  </ListItem>
                                </Link>
                              </List>
                            </Card>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </ListItem>
              </List>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
}

export default Navbar;
