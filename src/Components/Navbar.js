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
import AuthContext from "../AuthContex";
import { BiSearch } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { NavLink, Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import React, { useState, useEffect, useContext, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Navbar({ searchItem, handleTextToSearch, handleInputValueToSearch }) {
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const [showCard, setShowCard] = useState(false);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const { signSuccess, clearSignupData } = useContext(AuthContext);
  const [isDropdownOpenUser, setIsDropDownOpenUser] = useState(false);
  const [showFirstContainer, setShowFirstContainer] = useState(true);
  const [enableClickOutside, setEnableClickOutside] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);

  const handleShowLargeSearch = () => {
    setShowFirstContainer(false);
    setEnableClickOutside(true);
  };

  const handleShowLargeNav = () => {
    setShowCard(true);
    setEnableClickOutside(true);
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      setEnableClickOutside(false);
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !enableClickOutside
      ) {
        setShowFirstContainer(true);
        setShowCard(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [enableClickOutside]);

  useEffect(() => {
    const closeDropdownOnClickOutside = (e) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        isDropdownOpenUser
      ) {
        setIsDropDownOpenUser(false);
      }
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", closeDropdownOnClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.addEventListener("click", closeDropdownOnClickOutside);
    };
  }, [isDropdownOpenUser]);

  if (
    location.pathname === "/signin" ||
    location.pathname === "/term" ||
    location.pathname === "/signup" ||
    location.pathname === "/notsignin"
  ) {
    return null;
  }

  return (
    <>
      {isSmallScreen ? (
        <>
          {showCard ? (
            <>
              <AppBar style={{ background: "transparent", position: "fixed" }}>
                <Toolbar className="sbar" style={{ backgroundColor: "none" }}>
                  <Container
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    ref={inputRef}>
                    <Link to="/searchcomponents">
                      <input
                        onChange={handleTextToSearch}
                        value={searchItem}
                        type="text"
                        className="sbarI"
                        placeholder="Search"></input>
                    </Link>
                    <Link to="/searchpage">
                      <button
                        onClick={() => {
                          setShowCard(false);
                        }}
                        className="sbarb">
                        CANCEL
                      </button>
                    </Link>
                  </Container>
                </Toolbar>
              </AppBar>
            </>
          ) : (
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
                        <NavLink to="/pod" style={navLinkStyle}>
                          <PodcastsIcon className="i2" />
                        </NavLink>
                      </ListItem>
                      <ListItem
                        className="i3"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <HeadphonesIcon className="i3" />
                        {isDropdownOpen && (
                          <Card
                            sx={{
                              mt: "2.5rem",
                              position: "absolute",
                              top: "-10",
                              left: "calc((100% - 24px) - 200px)",
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
                                    borderBottom:
                                      "solid rgba(255, 255, 255, 0.15)",
                                    height: "50px",
                                    fontSize: "1.3rem",
                                  }}>
                                  Music
                                </ListItem>
                              </Link>
                              <Link to="/pod" style={{ color: "white" }}>
                                <ListItem
                                  style={{
                                    height: "50px",
                                    borderBottom:
                                      "solid rgba(255, 255, 255, 0.15)",
                                    fontSize: "1.3rem",
                                  }}>
                                  Podcasts
                                </ListItem>
                              </Link>
                              {signSuccess ? (
                                <Link
                                  to="/favorites"
                                  style={{ color: "white" }}>
                                  <ListItem
                                    style={{
                                      marginBottom: "15px",
                                      fontSize: "1.3rem",
                                    }}>
                                    Favorites
                                  </ListItem>
                                </Link>
                              ) : (
                                <Link
                                  to="/notsignin"
                                  style={{ color: "white" }}>
                                  <ListItem
                                    style={{
                                      marginBottom: "15px",
                                      fontSize: "1.3rem",
                                    }}>
                                    Favorites
                                  </ListItem>
                                </Link>
                              )}
                            </List>
                          </Card>
                        )}
                      </ListItem>
                      <ListItem ref={inputRef}>
                        <Link to="/searchpage">
                          <BiSearch
                            className="i4"
                            onClick={(e) => handleShowLargeNav(e)}
                          />
                        </Link>
                      </ListItem>
                      <ListItem ref={cardRef}>
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

                                      <Link
                                        to="/term"
                                        style={{ color: "white" }}>
                                        <ListItem
                                          style={{
                                            height: "50px",
                                            borderBottom:
                                              "solid rgba(255, 255, 255, 0.15)",
                                          }}>
                                          Terms & Conditions
                                        </ListItem>
                                      </Link>

                                      <ListItem
                                        onClick={() => clearSignupData()}
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
                                            backgroundColor:
                                              "rgb(37, 209, 218)",
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
                  </List>
                </Toolbar>
              </AppBar>
            </>
          )}
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
                  {isDropdownOpen ? (
                    <>
                      <>
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
                                  borderBottom:
                                    "solid rgba(255, 255, 255, 0.15)",
                                  height: "50px",
                                }}>
                                Music
                              </ListItem>
                            </Link>
                            <Link to="/pod" style={{ color: "white" }}>
                              <ListItem
                                style={{
                                  height: "50px",
                                  borderBottom:
                                    "solid rgba(255, 255, 255, 0.15)",
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
                    </>
                  ) : (
                    <></>
                  )}
                </ListItem>
                <Container
                  sx={{
                    minWidth: "32rem",
                    height: "70px",
                    display: "flex",
                  }}>
                  {showFirstContainer ? (
                    <>
                      <Container
                        sx={{
                          width: "220px",
                          borderRadius: "50px",
                          display: "flex",
                          alignItems: "center",
                          padding: "4px 2px",
                          backgroundColor: "#fff",
                          fontSize: "12px",
                          height: "35px",
                          marginTop: "1rem",
                          marginLeft: "18rem",
                        }}
                        ref={inputRef}>
                        <Link to="/searchpage">
                          <InputBase
                            id="amazon"
                            onClick={() => {
                              handleShowLargeSearch();
                            }}
                            type="text"
                            onChange={handleTextToSearch}
                            placeholder="Search..."
                            value={searchItem}
                            style={{
                              height: "20px",
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
                    </>
                  ) : (
                    <>
                      <AppBar
                        className={`fade-container ${
                          showFirstContainer ? "fade-in" : "fade-out"
                        }`}
                        ref={inputRef}
                        style={{
                          background: "transparent",
                          width: "100%",
                          position: "relative",
                        }}>
                        <Toolbar
                          className="sbar"
                          sx={{ width: "100%" }}
                          style={{ backgroundColor: "none" }}>
                          <Link to="/searchcomponents">
                            <input
                              id="table"
                              onClick={(e) => handleShowLargeSearch(e)}
                              onChange={handleTextToSearch}
                              value={searchItem}
                              type="text"
                              className="sbarI"
                              placeholder="Search"></input>
                          </Link>
                        </Toolbar>
                      </AppBar>
                    </>
                  )}
                </Container>

                <ListItem
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  ref={cardRef}>
                  <Button
                    sx={{
                      color: "white",
                      borderRadius: "50px",
                      height: "30px",
                      background: "rgba(255, 255, 255, 0.15)",
                    }}
                    onClick={() => toggleDropDownUser()}>
                    <HiUser
                      style={{ fontSize: "1.4rem" }}
                      onClick={() => {
                        toggleDropDownUser();
                      }}
                    />
                  </Button>
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

                                <ListItem
                                  style={{
                                    height: "50px",
                                    color: "white",
                                  }}
                                  onClick={() => clearSignupData()}>
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
                                        paddingLeft: "15px",
                                        paddingRight: "15px",
                                      },
                                      backgroundColor: "rgb(37, 209, 218)",
                                      borderRadius: "50px",
                                      paddingLeft: "20px",
                                      paddingRight: "20px",
                                      width: "220px",
                                      color: "black",
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
