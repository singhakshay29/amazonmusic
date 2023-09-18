import React, { useState } from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { NavLink } from "react-router-dom";
import { ListItem, List } from "@mui/material";

export default function CardComponent({
  album,
  handleMouseEnter,
  handleMouseLeave,
  hoverStates,
  updateSongPlayCallback,
  togglePlayPause,
  isPlaying,
}) {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const baseUrlSong =
    "https://academics.newtonschool.co/api/v1/music/favorites/like";

  async function addandRemoveFavItem(songId) {
    console.log(songId);
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      const response = await fetch(baseUrlSong, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${parsedData.signup.token}`,
          projectID: "8jf3b15onzua",
        },
        BODY: { songId: songId },
      });
      console.log(response);
    }
  }

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };
  return (
    <>
      <Card
        className="container"
        key={album._id}
        sx={{
          minWidth: 166,
          margin: "8px 20px",
          position: "relative",
          zIndex: 0,
        }}
        style={{ backgroundColor: "black" }}>
        <CardActionArea>
          <div className="overlay"></div>

          <CardMedia
            component="img"
            image={album.thumbnail}
            alt={album.title}
            style={{
              borderRadius: "8px",
              height: "160px",
              width: "160px",
            }}
            onMouseOver={() => handleMouseEnter(album._id)}
            onMouseLeave={() => handleMouseLeave(album._id)}></CardMedia>
          {hoverStates[album._id] && (
            <>
              <Button
                variant="contained"
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 8,
                  background: "FFFFFF26",
                  color: "white",
                  borderRadius: "81%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onMouseEnter={() => handleMouseEnter(album._id)}
                onMouseLeave={() => handleMouseLeave(album._id)}
                onClick={() => {
                  updateSongPlayCallback(album._id);
                  togglePlayPause(!isPlaying);
                }}>
                <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "20%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  background: "transparent",
                }}
                onMouseEnter={() => handleMouseEnter(album._id)}
                onMouseLeave={() => handleMouseLeave(album._id)}
                onClick={() => addandRemoveFavItem(album._id)}>
                <AddIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "80%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  background: "transparent",
                  border: "none",
                }}
                onClick={toggleDropDown}
                onMouseEnter={() => {
                  handleMouseEnter(album._id);
                  setIsDropDownOpen(true);
                }}
                onMouseLeave={() => {
                  handleMouseLeave(album._id);
                  setIsDropDownOpen(false);
                }}>
                <MoreHorizIcon />
                {isDropdownOpen && (
                  <Card
                    sx={{
                      mt: "3rem",
                      position: "absolute",
                      left: 15,
                      zIndex: 99999,
                    }}>
                    <List
                      style={{
                        position: "fixed",
                        border: "0.5px solid grey",
                        width: "280px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(15,17,17,.7)",
                        backdropFilter: "blur(30px)",
                      }}
                      onMouseEnter={() => setIsDropDownOpen(true)}>
                      <NavLink
                        to="/favorites"
                        style={{
                          color: "white",
                        }}
                        onClick={toggleDropDown}>
                        <ListItem onMouseEnter={() => setIsDropDownOpen(true)}>
                          Add to Favorites
                        </ListItem>
                      </NavLink>
                    </List>
                  </Card>
                )}
              </Button>
            </>
          )}
          <CardContent
            style={{
              height: "100px",
              width: "12em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              background: "black",
              color: "white",
              padding: "16px 8px",
            }}>
            <Typography gutterBottom variant="h6" component="div">
              {album.title}
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
              {album.artist[0]?.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
