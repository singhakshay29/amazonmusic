import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from "@mui/material";
import React, { useEffect } from "react";
import { MdRemove } from "react-icons/md";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { BsFillPlayFill } from "react-icons/bs";
let id = [];
export default function CardComponent({
  album,
  isPlaying,
  signSuccess,
  hoverStates,
  playpausesong,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  handleTogglePlayPause,
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

  async function getTheFavList() {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      const response = await fetch(baseUrlSong, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.signup.token}`,
          projectId: "8jf3b15onzua",
        },
      });
      const data = await response.json();
      id = data.data?.songs.map((item) => item._id);
    }
  }

  useEffect(() => {
    getTheFavList();
    // eslint-disable-next-line
  }, []);

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
              cursor: "default",
            }}
            onMouseOver={() => handleMouseEnter(album._id)}
            onMouseLeave={() => handleMouseLeave(album._id)}></CardMedia>
          {hoverStates[album._id] && (
            <>
              <Button
                variant="contained"
                sx={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 8,
                  backdropFilter: "blur(10px)",
                  color: "white",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "none",
                  width: "55px",
                  height: "60px",
                  transition:
                    "width 0.2s ease ,height 0.2s ease,padding 0.2s ease",
                  padding: "14px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    width: "65px",
                    height: "63px",
                    padding: "0",
                  },
                }}
                onMouseEnter={() => handleMouseEnter(album._id)}
                onMouseLeave={() => handleMouseLeave(album._id)}
                onClick={() => {
                  updateSongPlayCallback(album._id);
                  togglePlayPause(!isPlaying);
                  // handleTogglePlayPause(album._id);
                }}>
                <>
                  <BsFillPlayFill
                    style={{ fontSize: "2.5rem", marginLeft: "4px" }}
                  />
                </>
                {/* {playpausesong[album._id] ? (
                  <>
                    <BsFillPauseFill style={{ fontSize: "2.5rem" }} />
                  </>
                ) : (
                  <>
                    <BsFillPlayFill
                      style={{ fontSize: "2.5rem", marginLeft: "4px" }}
                    />
                  </>
                )} */}
              </Button>
              {signSuccess ? (
                <>
                  {id.includes(album._id) ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          position: "absolute",
                          top: "30%",
                          left: "20%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          background: "transparent",
                          boxShadow: "none",
                        }}
                        onMouseEnter={() => handleMouseEnter(album._id)}
                        onMouseLeave={() => handleMouseLeave(album._id)}
                        onClick={() => addandRemoveFavItem(album._id)}>
                        <MdRemove style={{ fontSize: "1.5rem" }} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          position: "absolute",
                          top: "30%",
                          left: "20%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          background: "transparent",
                          boxShadow: "none",
                        }}
                        onMouseEnter={() => handleMouseEnter(album._id)}
                        onMouseLeave={() => handleMouseLeave(album._id)}
                        onClick={() => addandRemoveFavItem(album._id)}>
                        <AddIcon />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Link to="/notsignin">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      position: "absolute",
                      top: "30%",
                      left: "20%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                      background: "transparent",
                      boxShadow: "none",
                    }}
                    onMouseEnter={() => handleMouseEnter(album._id)}
                    onMouseLeave={() => handleMouseLeave(album._id)}>
                    <AddIcon style={{ fontSize: "1.5rem" }} />
                  </Button>
                </Link>
              )}
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "9.8rem",
              }}>
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
