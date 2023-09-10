import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
//import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from '@mui/material/MenuItem';
//import Menu from "@mui/material/Menu";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const [searchItem, setSearchItem] = useState("");

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "red" : "normal",
      TextDecoration: isActive ? "none" : "underline",
    };
  };

  const handleSearchItem = (e) => {
    setSearchItem(e.target.value);
  };

  const handleInputValue = () => {
    console.log(searchItem);
    setSearchItem("");
  };
  async function getTheDeatails() {
    const storedsongs = localStorage.getItem("musicData");
    // const storedalbum = localStorage.getItem("albumData");

    const parsedDatasongs = JSON.parse(storedsongs);
    // const parsedDataalbum = JSON.parse(storedalbum);

    const songsArray = parsedDatasongs.musicData;
    // const songsSecondArray = parsedDataalbum.albumData;

    // const filterArray = songsArray.filter(
    //   (item) => item.artist.map((artist) => console.log(artist.name))
    //   // item.artist((artist) =>
    //   //   artist.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
    //   // )
    // );
  }

  useEffect(() => {
    getTheDeatails();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid grey",
        }}>
        <Card
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "black",
          }}>
          <NavLink to="/" style={navLinkStyle}>
            <CardMedia
              component="img"
              style={{
                backgroundColor: "black",
                width: "180px",
                margin: "1rem",
              }}
              src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
              alt="amazon music"
            />
          </NavLink>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            sx={{ backgroundColor: "black", color: "white", margin: "1rem" }}>
            <NavLink to="/">
              <HomeIcon sx={{ mx: "1rem" }} />
              Home
            </NavLink>
          </Typography>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            sx={{ backgroundColor: "black", color: "white", margin: "1rem" }}>
            <NavLink to="/podcasts">
              <PodcastsIcon sx={{ mx: "1rem" }} />
              Podcasts
            </NavLink>
          </Typography>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            sx={{ backgroundColor: "black", color: "white", margin: "1rem" }}>
            <NavLink to="/">
              <HeadphonesIcon sx={{ mx: "1rem" }} />
              Library
              <KeyboardArrowDownIcon sx={{ mx: "0.5rem" }} />
            </NavLink>
          </Typography>
        </Card>
        <Card sx={{ minWidth: 130 }}></Card>

        <Card
          style={{
            margin: "auto",
            width: "256px",
            borderRadius: "50px",
            cursor: "pointer",
            display: "block",
            paddingInlineEnd: "60px",
            paddingiInlineStart: "24px",
            border: "none",
            fontSize: "14px",
            outline: "none",
          }}>
          <InputBase
            placeholder="Search..."
            value={searchItem}
            onChange={handleSearchItem}></InputBase>
          <SearchIcon onClick={handleInputValue} />
        </Card>
        <NavLink to="signin">
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
