import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function CardComponent({
  album,
  isPlaying,
  signSuccess,
  hoverStates,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  updateSongPlayCallback,
}) {
  const baseUrlSong =
    "https://academics.newtonschool.co/api/v1/music/favorites/like";

  async function addandRemoveFavItem(songId) {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      await fetch(baseUrlSong, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.signup.token}`,
          projectId: "8jf3b15onzua",
        },
        body: JSON.stringify({ songId: songId }),
      });
    }
  }

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

              {signSuccess ? (
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
              ) : (
                <Link to="/notsignin">
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
                </Link>
              )}
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
