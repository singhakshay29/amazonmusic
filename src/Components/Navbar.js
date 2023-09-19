import React, { useState } from "react";
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

function Navbar({
  searchItem,
  handleTextToSearch,
  handleInputValueToSearch,
  signSuccess,
}) {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [isDropdownOpenUser, setIsDropDownOpenUser] = useState(false);

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

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid grey",
          alignItems: "center",
          position: "fixed",
          backgroundColor: "rgba(15,17,17,.6)",
          zIndex: 1000,
          backdropFilter: "blur(30px)",
          width: "100%",
          fontfamily: "Sharp Grotesk SmBold 40 ",
        }}>
        <NavLink to="/">
          <CardMedia
            component="img"
            style={{
              backgroundColor: "transparent",
              width: "150px",
              marginTop: "10px",
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
            width: "482px",
            height: "80px",
            boxShadow: "none",
          }}>
          <ListItem style={{ fontSize: "1rem", padding: "0" }}>
            <NavLink to="/" style={navLinkStyle}>
              <HomeIcon sx={{ mx: "0.5rem" }} />
              HOME
            </NavLink>
          </ListItem>
          <ListItem
            style={{
              fontSize: "1rem",
              marginRight: "1rem",
            }}>
            <NavLink to="/podcasts" style={navLinkStyle}>
              <PodcastsIcon sx={{ mx: "0.5rem" }} />
              PODCASTS
            </NavLink>
          </ListItem>
          <ListItem
            style={{ fontSize: "1rem", color: "white", cursor: "pointer" }}
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
                  <NavLink to="/favorites" style={{ color: "white" }}>
                    <ListItem style={{ marginBottom: "15px" }}>
                      Favorites
                    </ListItem>
                  </NavLink>
                </List>
              </Card>
            )}
          </ListItem>
        </Card>
        <Card
          style={{
            marginLeft: "15rem",
            width: "256px",
            borderRadius: "50px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 6px",
            border: "1px solid white",
            backgroundColor: "#fff",
            fontSize: "14px",
            outline: "none",
            height: "35px",
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
          sx={{ fontSize: "2rem" }}
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
  );
}

export default Navbar;
