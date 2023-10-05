import {
  List,
  Button,
  ListItem,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import Box from "@mui/material/Box";
import mylikes from "../assests/mylikes.png";
import { BsFillPlayFill } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useState, useEffect, useContext } from "react";
import DataContext from "../DataContext";

export default function Favorites({ updateSongPlayCallback }) {
  const {
    isPlaying,
    loader,
    togglePlayPause,
    playlistsongs,
    addandRemoveFavItem,
  } = useContext(DataContext);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const card = (
    <React.Fragment>
      <div
        style={{
          marginLeft: "25rem",
          maxWidth: "60%",
          height: "10px",
        }}>
        <Typography
          sx={{
            fontWeight: "900",
            fontSize: "1rem",
            padding: 0,
          }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Playlist
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontFamily: "Gabarito",
            fontSize: "5rem",
            textOverflow: "ellipsis",
            whiteSpace: "wrap",
          }}
          className="font"
          component="div">
          Your Favorites
        </Typography>
        <CardActions sx={{ marginTop: "4rem" }}>
          <button
            className="spbplay"
            onClick={() => {
              updateSongPlayCallback(playlistsongs?.[0]?._id);
              togglePlayPause(!isPlaying);
            }}>
            <BsFillPlayFill style={{ fontSize: "1.5rem" }} />
            Play
          </button>
        </CardActions>
      </div>
    </React.Fragment>
  );

  const cardResponsive = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold", textAlign: "center" }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Playlist
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            flexWrap: "wrap",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
          }}
          component="div">
          Your Favorites
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="spbplay"
          onClick={() => {
            updateSongPlayCallback(playlistsongs?.[0]?._id);
            togglePlayPause(!isPlaying);
          }}>
          <BsFillPlayFill style={{ fontSize: "1.5rem" }} />
          Play
        </button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <>
        {isSmallScreen ? (
          <>
            <div
              style={{
                backgroundImage: `url(${mylikes})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                width: "100%",
                height: "750px",
                filter: "blur(10px)",
                marginTop: "-7rem",
              }}></div>
            <div className="pI">
              <img src={mylikes} className="image" alt="Likes" />
              <div className="iD">{cardResponsive}</div>
            </div>

            <div
              style={{
                marginTop: "10rem",
                width: "100%",
                marginBottom: "10rem",
              }}>
              {playlistsongs.length > 0 &&
                playlistsongs.map((songs, index) => (
                  <List key={index} className="listDisplay">
                    <List className="sL">
                      <ListItem
                        sx={{
                          minWidth: "20px",
                          fontSize: "17px",
                          color: "gray",
                          paddingX: "15px",
                        }}>
                        {index + 1}
                      </ListItem>
                      <div style={{ minWidth: "74px", padding: "0" }}>
                        <img
                          src={songs?.thumbnail}
                          alt={songs?.title}
                          className="imageList"
                        />
                      </div>
                      <ListItem
                        sx={{
                          minWidth: "90px",
                          display: "flex",
                          paddingLeft: "10px",
                          overflow: "hidden",
                          fontSize: "15px",
                          boxSizing: "border-box",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                        {songs?.title}
                      </ListItem>
                    </List>
                    <List className="sL">
                      <ListItem sx={{ minWidth: "50px" }}>
                        <Button
                          sx={{
                            borderRadius: "20px",
                            color: "white",
                          }}
                          onClick={() => {
                            updateSongPlayCallback(songs?._id);
                            togglePlayPause(!isPlaying);
                          }}>
                          <PlayArrowIcon />
                          Play
                        </Button>
                      </ListItem>
                      <ListItem sx={{ minWidth: "30px" }}>
                        <Button>
                          <MdRemoveCircleOutline
                            onClick={() => addandRemoveFavItem(songs?._id)}
                            style={{ color: "white", fontSize: "1.3rem" }}
                          />
                        </Button>
                      </ListItem>
                    </List>
                  </List>
                ))}
            </div>
          </>
        ) : (
          <>
            {loader ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "40rem",
                    marginTop: "3rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <CircularProgress sx={{ color: "rgb(37, 209, 218)" }} />
                </Box>
              </>
            ) : (
              <>
                <div
                  style={{
                    backgroundImage: `url(${mylikes})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "40rem",
                    filter: "blur(10px)",
                    marginTop: "1rem",
                  }}></div>
                <img
                  src={mylikes}
                  alt="mylikes"
                  className="pI imgP playlistMainI"
                />
                <div className="pI playlistMainI">
                  <div
                    style={{
                      background: "transparent",
                      boxShadow: "none",
                      marginLeft: "2rem",
                    }}>
                    {card}
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "5rem",
                  }}>
                  {playlistsongs?.length > 0 &&
                    playlistsongs.map((songs, index) => (
                      <List key={index} className="listDisplay">
                        <List className="sL">
                          <ListItem
                            sx={{
                              minWidth: "20px",
                              fontSize: "17px",
                              color: "gray",
                              paddingX: "15px",
                            }}>
                            {index + 1}
                          </ListItem>
                          <div style={{ minWidth: "74px", padding: "0" }}>
                            <img
                              src={songs?.thumbnail}
                              alt={songs?.title}
                              className="imageList"
                            />
                          </div>
                          <ListItem
                            sx={{
                              minWidth: "190px",
                              display: "flex",
                              paddingLeft: "10px",
                              fontSize: "15px",
                            }}>
                            {songs?.title}
                          </ListItem>
                        </List>
                        <List className="sL">
                          <ListItem sx={{ minWidth: "50px" }}>
                            <Button
                              sx={{
                                borderRadius: "20px",
                                color: "white",
                              }}
                              onClick={() => {
                                updateSongPlayCallback(songs?._id);
                                togglePlayPause(!isPlaying);
                              }}>
                              <PlayArrowIcon />
                              Play
                            </Button>
                          </ListItem>
                          <ListItem sx={{ minWidth: "30px" }}>
                            <Button>
                              <MdRemoveCircleOutline
                                style={{ color: "white", fontSize: "1.3rem" }}
                                onClick={() => addandRemoveFavItem(songs?._id)}
                              />
                            </Button>
                          </ListItem>
                        </List>
                      </List>
                    ))}
                </div>
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
