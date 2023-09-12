import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from '@mui/material/MenuItem';
//import Menu from "@mui/material/Menu";
import Card from "@mui/material/Card";
import { CardMedia, ListItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { useLocation } from "react-router-dom";

function Navbar({ searchItem, handleTextToSearch, handleInputValueToSearch }) {
  //const location = useLocation();
  // const [searchItem, setSearchItem] = useState("");
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "rgb(37, 209, 218)" : "white",
    };
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
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
          backgroundColor: "black",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid grey",
          alignItems: "center",
        }}>
        <NavLink to="/">
          <CardMedia
            component="img"
            style={{
              backgroundColor: "black",
              width: "150px",
            }}
            src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
            alt="amazon music"
          />
        </NavLink>
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "black",
          }}>
          <ListItem style={{ marginRight: "1rem", fontSize: "1.1rem" }}>
            <NavLink to="/" style={navLinkStyle}>
              <HomeIcon sx={{ mx: "0.5rem", fontSize: "1.8rem" }} />
              HOME
            </NavLink>
          </ListItem>
          <ListItem
            style={{
              fontSize: "1.2rem",
              marginRight: "1rem",
            }}>
            <NavLink to="/podcasts" style={navLinkStyle}>
              <PodcastsIcon sx={{ mx: "0.5rem", fontSize: "1.6rem" }} />
              PODCASTS
            </NavLink>
          </ListItem>
          <ListItem
            style={{ fontSize: "1.2rem", color: "white", cursor: "pointer" }}
            onClick={toggleDropDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <HeadphonesIcon sx={{ mx: "0.5rem" }} />
            LIBRARY
            <KeyboardArrowDownIcon sx={{ mx: "0.5rem" }} />
            {isDropdownOpen && (
              <Card
                style={{
                  backgroundColor: "red",
                }}
                sx={{
                  mt: "3rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.9)",
                  borderBottom: "4px solid green",
                  position: "absolute",
                  top: "40%",
                  left: 80,
                  zIndex: 1,
                }}>
                <ul style={{ listStyleType: "none", position: "fixed" }}>
                  <NavLink
                    to="/trendingplaylist"
                    style={{ color: "white", textDecoration: "none" }}
                    onClick={toggleDropDown}>
                    <li>Music</li>
                  </NavLink>
                  <br />
                  <NavLink
                    to="/podcasts"
                    style={{ color: "white", textDecoration: "none" }}>
                    <li>Podcasts</li>
                  </NavLink>
                  <br />
                </ul>
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
          }}>
          <InputBase
            onChange={handleTextToSearch}
            placeholder="Search..."
            value={searchItem}
            style={{
              flex: 1,
              marginRight: "8px",
              border: "none",
              outline: "none",
            }}
          />
          <IconButton
            style={{
              padding: "6px",
              background: "none",
            }}>
            <SearchIcon onClick={handleInputValueToSearch} />
          </IconButton>
        </Card>
        <NavLink to="/noresultfound">
          <AccountCircleIcon sx={{ fontSize: "2rem" }} />
        </NavLink>

        {/* <Menu
          id="menu-appbar"
          // anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          Conditionally render Login or Logout based on user authentication
          {userAuthenticated ? (
              <div>
                <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/subscription">Subscription</MenuItem>
              </div>
            ) : (
              <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
            )}
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
