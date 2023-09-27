import {
  Card,
  List,
  Button,
  AppBar,
  Toolbar,
  ListItem,
  CardMedia,
  InputBase,
  IconButton,
} from "@mui/material";
import mini from "../assests/mini.png";
import { GoHomeFill } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Navbar({
  useName,
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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

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
      setIsSmallScreen(window.innerWidth < 800);
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
                        className="dropmusic d1"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <NavLink
                          to="/trendingplaylist"
                          onClick={toggleDropDown}>
                          <li
                            style={{
                              background: "rgba(15, 17, 17, 0.7)",
                              backdropFilter: "blur(30px)",
                            }}
                            className="d1l1">
                            Music
                          </li>
                        </NavLink>
                        <NavLink to="/podcasts" style={{ color: "white" }}>
                          <ListItem
                            style={{
                              background: "rgba(15, 17, 17, 0.7)",
                              backdropFilter: "blur(30px)",
                            }}
                            className="d1l1">
                            Podcasts
                          </ListItem>
                        </NavLink>
                        {signSuccess ? (
                          <NavLink to="/favorites" style={{ color: "white" }}>
                            <ListItem
                              style={{
                                background: "rgba(15, 17, 17, 0.7)",
                                backdropFilter: "blur(30px)",
                              }}
                              className="d1l1">
                              Favorites
                            </ListItem>
                          </NavLink>
                        ) : (
                          <NavLink to="/notsignin" style={{ color: "white" }}>
                            <ListItem
                              style={{
                                background: "rgba(15, 17, 17, 0.7)",
                                backdropFilter: "blur(30px)",
                              }}
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
                      <div className="dropuser du1">
                        <List
                          // style={{
                          //   position: "fixed",
                          //   border: "0.5px solid grey",
                          //   width: "250px",
                          //   borderRadius: "10px",
                          //   backgroundColor: "rgba(15,17,17,.7)",
                          //   zIndex: 1000,
                          //   backdropFilter: "blur(30px)",
                          // }}
                          sx={{
                            backgroundColor: "rgba(15,17,17,.7)",
                            backdropFilter: "blur(30px)",
                          }}>
                          {signSuccess ? (
                            <>
                              <ListItem>
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
                              </Button>
                            </>
                          ) : (
                            <NavLink to="/signin">
                              <Button
                                // style={{
                                //   margin: "1rem",
                                //   border: "2px solid rgb(37, 209, 218)",
                                //   backgroundColor: "rgb(37, 209, 218)",
                                //   borderRadius: "50px",
                                //   width: "220px",
                                //   color: "black",
                                //   cursor: "pointer",
                                // }}
                                sx={{
                                  m: "1rem",
                                  border: "2px solid transparent",
                                  "&:hover": {
                                    backgroundColor: "#a8edf0",
                                    // fontSize: "15px",
                                    // width: "225px",
                                    // paddingInlineStart: "5px",
                                    // paddingInlineEnd: "5px",
                                    // border: "2px solid transparent",
                                    width: "211px",
                                  },
                                  backgroundColor: "rgb(37, 209, 218)",
                                  borderRadius: "50px",
                                  width: "210px",
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
                            </NavLink>
                          )}
                          <NavLink
                            to="/subscription"
                            style={{ color: "white" }}>
                            <ListItem style={{ cursor: "pointer" }}>
                              Subscription
                            </ListItem>
                          </NavLink>
                        </List>
                      </div>
                    )}
                  </ListItem>
                </List>
              </List>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar
            position="static"
            // className="appbar" style={{ background: "transparent" }}
          >
            <Toolbar
              // className="toolbar"
              // style={{
              //   background:"none"
              // }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "solid rgba(255, 255, 255, 0.15)",
                position: "fixed",
                backgroundColor: "rgba(15,17,17,.6)",
                zIndex: 1000,
                backdropFilter: "blur(30px)",
                width: "100%",
                fontfamily: "Sharp Grotesk SmBold 40 ",
                height: "60px",
                paddingBottom: "20px",
              }}>
              <NavLink to="/">
                <CardMedia
                  component="img"
                  style={{
                    width: "150px",
                    position: "absolute",
                    padding: "0",
                    margin: "0",
                  }}
                  src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
                  alt="amazon music"
                />
              </NavLink>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  width: "455px",
                  height: "80px",
                  boxShadow: "none",
                  position: "fixed",
                  marginLeft: "11rem",
                  marginTop: "1.5rem",
                }}>
                <ListItem
                  style={{
                    fontSize: "1rem",
                    padding: "0",
                    margin: "0",
                  }}>
                  <NavLink to="/" style={navLinkStyle}>
                    <HomeIcon style={{ marginRight: "0.5rem" }} />
                    HOME
                  </NavLink>
                </ListItem>
                <ListItem
                  style={{
                    fontSize: "1rem",
                    marginRight: "1rem",
                  }}>
                  <NavLink to="/podcasts" style={navLinkStyle}>
                    <PodcastsIcon sx={{ mx: "0.1rem" }} />
                    PODCASTS
                  </NavLink>
                </ListItem>
                <ListItem
                  style={{
                    fontSize: "1rem",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={toggleDropDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <HeadphonesIcon sx={{ mx: "0.5rem" }} />
                  LIBRARY
                  <KeyboardArrowDownIcon sx={{ mx: "0.5rem" }} />
                  {isDropdownOpen && (
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
                        <NavLink
                          to="/trendingplaylist"
                          style={{
                            color: "white",
                          }}
                          onClick={toggleDropDown}>
                          <ListItem
                            style={{
                              borderBottom: "1px solid grey",
                              height: "50px",
                            }}>
                            Music
                          </ListItem>
                        </NavLink>
                        <NavLink to="/podcasts" style={{ color: "white" }}>
                          <ListItem
                            style={{
                              height: "50px",
                              borderBottom: "1px solid grey",
                            }}>
                            Podcasts
                          </ListItem>
                        </NavLink>
                        {signSuccess ? (
                          <NavLink to="/favorites" style={{ color: "white" }}>
                            <ListItem style={{ marginBottom: "15px" }}>
                              Favorites
                            </ListItem>
                          </NavLink>
                        ) : (
                          <NavLink to="/notsignin" style={{ color: "white" }}>
                            <ListItem style={{ marginBottom: "15px" }}>
                              Favorites
                            </ListItem>
                          </NavLink>
                        )}
                      </List>
                    </Card>
                  )}
                </ListItem>
              </Card>
              <Card
                style={{
                  marginLeft: "55rem",
                  width: "256px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "4px 6px",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  height: "35px",
                  marginTop: "1rem",
                }}>
                <Link to="/searchcomponents">
                  <InputBase
                    onChange={handleTextToSearch}
                    placeholder="Search..."
                    value={searchItem}
                    style={{
                      flex: 1,
                      marginRight: "8px",
                      border: "none",
                      outline: "none",
                      height: "10px",
                    }}
                  />
                </Link>
                <IconButton
                  style={{
                    padding: "6px",
                    background: "none",
                  }}>
                  <SearchIcon onClick={handleInputValueToSearch} />
                </IconButton>
              </Card>
              <AccountCircleIcon
                sx={{ fontSize: "2rem", marginTop: "1rem" }}
                onClick={toggleDropDownUser}
              />
              {isDropdownOpenUser && (
                <Card
                  sx={{
                    mt: "3rem",
                    position: "absolute",
                    top: "8%",
                    left: "78%",
                    zIndex: 1,
                  }}>
                  <List
                    style={{
                      position: "fixed",
                      border: "0.5px solid grey",
                      width: "250px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(15,17,17,.7)",
                      zIndex: 1000,
                      backdropFilter: "blur(30px)",
                    }}>
                    {signSuccess ? (
                      <>
                        <ListItem>
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
                        </Button>
                      </>
                    ) : (
                      <NavLink to="/signin">
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
                      </NavLink>
                    )}
                    <NavLink to="/subscription" style={{ color: "white" }}>
                      <ListItem>Subscription</ListItem>
                    </NavLink>
                  </List>
                </Card>
              )}
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
}

export default Navbar;
