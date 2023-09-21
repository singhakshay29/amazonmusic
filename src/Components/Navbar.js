import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import { CardMedia, ListItem, List, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

function Navbar({
  searchItem,
  handleTextToSearch,
  handleInputValueToSearch,
  signSuccess,
  useName,
}) {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [isDropdownOpenUser, setIsDropDownOpenUser] = useState(false);
  const [isDropdownOpenSearch, setIsDropDownOpenSearch] = useState(false);
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

  const toggleDropDownSearch = () => {
    setIsDropDownOpenSearch(!isDropdownOpenSearch);
  };

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
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
          <Box sx={{ flexGrow: 1, m: "0", p: "0" }}>
            <AppBar position="static">
              <Toolbar
                style={{
                  backgroundColor: "rgba(15,17,17,.6)",
                  padding: "0",
                  margin: "0",
                  position: "fixed",
                  width: "100%",
                  borderBottom: "1px solid grey",
                  zIndex: 1000,
                  backdropFilter: "blur(30px)",
                }}>
                <CardMedia
                  component="img"
                  style={{
                    position: "absolute",
                    maxWidth: "60px",
                    marginLeft: "1rem",
                  }}
                  src="https://assets.amazonmusic.com/dims4/default/ce000f1/2147483647/strip/true/crop/1000x606+0+0/resize/1800x1091!/quality/90/?url=http%3A%2F%2Famazon-topics-brightspot.s3.amazonaws.com%2Fmusic%2F8c%2F31%2Ff1bef2204534abc4fb62700c0bc5%2Fam-stacked-white.png"
                  alt="amazon music"
                />
                <Box
                  style={{ display: "flex", justifyContent: "flex-end" }}
                  sx={{ flexGrow: 1 }}>
                  <NavLink to="/" style={navLinkStyle}>
                    <HomeIcon style={{ margin: "0.5rem" }} />
                  </NavLink>
                  <NavLink to="/podcasts" style={navLinkStyle}>
                    <PodcastsIcon sx={{ m: "0.5rem" }} />
                  </NavLink>
                  <HeadphonesIcon
                    sx={{ m: "0.5rem" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  {isDropdownOpen && (
                    <Card
                      sx={{
                        mt: "3rem",
                        position: "absolute",
                        left: 130,
                        zIndex: 1,
                        top: -15,
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}>
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
                  <SearchIcon
                    sx={{ m: "0.5rem" }}
                    onClick={toggleDropDownSearch}
                  />
                  {isDropdownOpenSearch && (
                    <Card
                      sx={{
                        mt: "3rem",
                        position: "absolute",
                        top: "8%",
                        left: "48%",
                        zIndex: 1,
                        width: "200px",
                        backgroundColor: "rgba(15,17,17,.7)",
                        border: "0.5px solid grey",
                        borderRadius: "10px",
                      }}>
                      <ListItem>
                        <Link to="/searchcomponents">
                          <Card style={{ display: "flex" }}>
                            <InputBase
                              onChange={handleTextToSearch}
                              placeholder="Search..."
                              value={searchItem}
                              style={{
                                flex: 1,
                                height: "30px",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                marginTop: "5px",
                              }}
                            />
                            <IconButton
                              style={{
                                padding: "6px",
                                background: "white",
                              }}>
                              <SearchIcon onClick={handleInputValueToSearch} />
                            </IconButton>
                          </Card>
                        </Link>
                      </ListItem>
                    </Card>
                  )}
                  <AccountCircleIcon
                    sx={{ m: "0.5rem" }}
                    onClick={toggleDropDownUser}
                  />
                  {isDropdownOpenUser && (
                    <Card
                      sx={{
                        mt: "3rem",
                        position: "absolute",
                        top: "8%",
                        left: "48%",
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
                          <NavLink to="/signin">
                            <Button
                              style={{
                                margin: "1rem",
                                border: "2px solid rgb(37, 209, 218)",
                                backgroundColor: "rgb(37, 209, 218)",
                                borderRadius: "50px",
                                width: "220px",
                                color: "black",
                                cursor: "pointer",
                              }}>
                              Hey {useName}
                            </Button>
                          </NavLink>
                        ) : (
                          <NavLink to="/signin">
                            <Button
                              style={{
                                margin: "1rem",
                                border: "2px solid rgb(37, 209, 218)",
                                backgroundColor: "rgb(37, 209, 218)",
                                borderRadius: "50px",
                                width: "220px",
                                color: "black",
                                cursor: "pointer",
                              }}>
                              SIGN IN
                            </Button>
                          </NavLink>
                        )}
                        <NavLink to="/subscription" style={{ color: "white" }}>
                          <ListItem style={{ cursor: "pointer" }}>
                            Subscription
                          </ListItem>
                        </NavLink>
                      </List>
                    </Card>
                  )}
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </>
      ) : (
        <>
          <AppBar position="static">
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid grey",
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
                        <NavLink to="/signin">
                          <Button
                            style={{
                              margin: "1rem",
                              border: "2px solid rgb(37, 209, 218)",
                              backgroundColor: "rgb(37, 209, 218)",
                              borderRadius: "50px",
                              width: "220px",
                              color: "black",
                            }}>
                            LOG OUT
                          </Button>
                        </NavLink>
                      </>
                    ) : (
                      <NavLink to="/signin">
                        <Button
                          style={{
                            margin: "1rem",
                            border: "2px solid rgb(37, 209, 218)",
                            backgroundColor: "rgb(37, 209, 218)",
                            borderRadius: "50px",
                            width: "220px",
                            color: "black",
                          }}>
                          SIGN IN
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
