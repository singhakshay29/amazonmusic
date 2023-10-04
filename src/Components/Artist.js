import {
  List,
  ListItem,
  Button,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BsFillPlayFill } from "react-icons/bs";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AuthContext from "../AuthContex";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DataContext from "../DataContext";
import { MdRemoveCircleOutline } from "react-icons/md";

export default function Artist({ setSearchItem, updateSongPlayCallback }) {
  const location = useLocation();
  const { data } = location.state;
  const [artist, setArtist] = useState([]);
  const [loder, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const { signSuccess } = useContext(AuthContext);
  const { isPlaying, togglePlayPause, addandRemoveFavItem, favoritesId } =
    useContext(DataContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  const baseUrl = `https://academics.newtonschool.co/api/v1/music/artist/${data?._id}`;

  async function getTheDeatails() {
    const response = await fetch(baseUrl, {
      headers: {
        projectId: "8jf3b15onzua",
      },
    });
    const artistDetails = await response.json();
    setArtist(artistDetails.data);
    const songsArray = artistDetails.data.songs;

    setplaylistsongs(songsArray);
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }

  const isAlbumInFavorites = (songId) => {
    return favoritesId.includes(songId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    const handleEffects = () => {
      setSearchItem("");
      getTheDeatails();
    };
    window.addEventListener("resize", handleResize);
    handleEffects();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, []);

  const cardResponsive = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold", textAlign: "center" }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Artist
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
          component="div">
          {artist.name}
        </Typography>

        <Typography
          style={{ color: "white", textAlign: "center" }}
          variant="body2">
          {artist.description}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            background: "rgb(37, 209, 218)",
            borderRadius: "20px",
            width: "80px",
            color: "black",
          }}
          onClick={() => {
            updateSongPlayCallback(artist?.songs[0]?._id);
            togglePlayPause(!isPlaying);
          }}>
          <PlayArrowIcon />
          Play
        </Button>
        {signSuccess ? (
          <>
            {artist?.songs?.[0]?._id &&
            isAlbumInFavorites(artist?.songs[0]?._id) ? (
              <>
                <Button
                  onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
                  <MdRemoveCircleOutline
                    style={{ color: "white", fontSize: "1.5rem" }}
                  />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
                  <AddIcon style={{ color: "white" }} />
                </Button>
              </>
            )}
          </>
        ) : (
          <Link to="/notsignin">
            <Button>
              <AddIcon style={{ color: "white" }} />
            </Button>
          </Link>
        )}
      </CardActions>
    </React.Fragment>
  );

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
          Artist
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontFamily: "Gabarito",
            fontSize: "5rem",
            overflow: "hidden",
            maxHeight: "19rem",
          }}
          className="font"
          component="div">
          {artist?.name}
        </Typography>
        <Typography
          sx={{
            marginTop: "2rem",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}>
          {artist?.description}
        </Typography>
        <CardActions>
          <button
            className="spbplay"
            onClick={() => {
              updateSongPlayCallback(artist?.songs[0]?._id);
              togglePlayPause(!isPlaying);
            }}>
            <BsFillPlayFill style={{ fontSize: "1.5rem" }} />
            Play
          </button>
          {signSuccess ? (
            <>
              {artist?.songs?.[0]?._id &&
              isAlbumInFavorites(artist?.songs[0]?._id) ? (
                <>
                  <Button
                    onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
                    <MdRemoveCircleOutline
                      style={{ color: "white", fontSize: "1.5rem" }}
                    />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
                    <AddIcon style={{ color: "white" }} />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Link to="/notsignin">
              <Button>
                <AddIcon
                  style={{
                    color: "white",
                    marginBottom: "10px",
                    "&:hover": {
                      backgroundColor: "#a8edf0",
                    },
                  }}
                />
              </Button>
            </Link>
          )}
        </CardActions>
      </div>
    </React.Fragment>
  );

  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              backgroundImage: `url(${artist.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: "100%",
              height: "750px",
              filter: "blur(10px)",
              marginTop: "-7rem",
            }}></div>
          <div className="pI">
            <img src={artist.image} className="image" alt={artist.title} />
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
                        src={songs.thumbnail}
                        alt={songs.title}
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
                      {songs.title}
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
                          updateSongPlayCallback(songs._id);
                          togglePlayPause(!isPlaying);
                        }}>
                        <PlayArrowIcon />
                        Play
                      </Button>
                    </ListItem>
                    <ListItem sx={{ minWidth: "30px" }}>
                      {signSuccess ? (
                        <>
                          {isAlbumInFavorites(songs?._id) ? (
                            <>
                              <Button
                                onClick={() => addandRemoveFavItem(songs?._id)}>
                                <MdRemoveCircleOutline
                                  style={{ color: "white", fontSize: "1.5rem" }}
                                />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={() => addandRemoveFavItem(songs?._id)}>
                                <AddIcon style={{ color: "white" }} />
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <Link to="/notsignin">
                          <Button
                            sx={{
                              borderRadius: "20px",
                              color: "white",
                            }}>
                            <AddIcon style={{ color: "white" }} />
                          </Button>
                        </Link>
                      )}
                    </ListItem>
                  </List>
                </List>
              ))}
          </div>
        </>
      ) : (
        <>
          {loder ? (
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
                  backgroundImage: `url(${artist.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "40rem",
                  filter: "blur(10px)",
                  marginTop: "1rem",
                }}></div>
              <img
                src={artist.image}
                alt={artist.title}
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
              <div>
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
                            src={songs.thumbnail}
                            alt={songs.title}
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
                          {songs.title}
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
                              updateSongPlayCallback(songs._id);
                              togglePlayPause(!isPlaying);
                            }}>
                            <PlayArrowIcon />
                            Play
                          </Button>
                        </ListItem>
                        <ListItem sx={{ minWidth: "30px" }}>
                          {signSuccess ? (
                            <>
                              {isAlbumInFavorites(songs?._id) ? (
                                <>
                                  <Button
                                    onClick={() =>
                                      addandRemoveFavItem(songs?._id)
                                    }>
                                    <MdRemoveCircleOutline
                                      style={{
                                        color: "white",
                                        fontSize: "1.5rem",
                                      }}
                                    />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    onClick={() =>
                                      addandRemoveFavItem(songs?._id)
                                    }>
                                    <AddIcon style={{ color: "white" }} />
                                  </Button>
                                </>
                              )}
                            </>
                          ) : (
                            <Link to="/notsignin">
                              <Button
                                sx={{
                                  borderRadius: "20px",
                                  color: "white",
                                }}>
                                <AddIcon style={{ color: "white" }} />
                              </Button>
                            </Link>
                          )}
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
  );
}
