import {
  Box,
  Card,
  Stack,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Artist({
  isPlaying,
  signSuccess,
  handleShowNav,
  setSearchItem,
  togglePlayPause,
  handleNotShowSearch,
  updateSongPlayCallback,
}) {
  handleShowNav();
  setSearchItem("");
  handleNotShowSearch();
  const location = useLocation();
  const { data } = location.state;
  const [artist, setArtist] = useState({});
  const [loader, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  const baseUrl = `https://academics.newtonschool.co/api/v1/music/artist/${data.artists[0]?._id}`;

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
    setLoader(false);
  }
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
          projectid: "8jf3b15onzua",
        },
        body: JSON.stringify({ songId: songId }),
      });
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getTheDeatails();
    // eslint-disable-next-line
  }, []);

  const cardResponsive = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold" }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Playlist
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "white", flexWrap: "wrap" }}
          component="div">
          {artist.title}
        </Typography>
        <Typography sx={{ mb: 8 }} color="text.secondary"></Typography>
        <Typography style={{ color: "white" }} variant="body2">
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
            updateSongPlayCallback(artist.songs[0]?._id);
            togglePlayPause(!isPlaying);
          }}>
          <PlayArrowIcon />
          Play
        </Button>
        {signSuccess ? (
          <Button onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
            <AddIcon style={{ color: "white" }} />
          </Button>
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
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold" }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Artist
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "white", flexWrap: "wrap" }}
          component="div">
          {artist.name}
        </Typography>
        <Typography variant="body2">{artist.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            background: "rgb(37, 209, 218)",
            borderRadius: "20px",
            width: "80px",
            color: "black",
          }}
          onClick={() => {
            updateSongPlayCallback(artist.songs[0]?._id);
            togglePlayPause(!isPlaying);
          }}>
          <PlayArrowIcon /> Play
        </Button>
        {signSuccess ? (
          <Button onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
            <AddIcon style={{ color: "black" }} />
          </Button>
        ) : (
          <Link to="/notsignin">
            <Button>
              <AddIcon style={{ color: "black" }} />
            </Button>
          </Link>
        )}
      </CardActions>
    </React.Fragment>
  );
  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              backgroundImage: `url(${artist.image})`,
              height: "100vh",
              filter: "blur(6px)",
              backgroundRepeat: "no-repeat",
            }}></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              margin: 0,
            }}>
            <Card
              sx={{
                width: 285,
                height: 285,
                m: "2rem",
                backgroundColor: "transparent",
              }}>
              <CardMedia
                component="img"
                image={artist.image}
                alt={artist.title}
                style={{
                  position: "absolute",
                  top: -550,
                  left: 70,
                  borderRadius: "20px",
                }}
              />
              <Card
                style={{
                  fontFamily:
                    "Sharp Grotesk Bold 20, Helvetica, Arial, sans-serif",
                  backgroundColor: "transparent",
                  position: "absolute",
                  top: -180,
                  left: 90,
                  width: "300px",
                  textAlign: "center",
                  boxShadow: "none",
                }}>
                {cardResponsive}
              </Card>
            </Card>
          </div>
          <div style={{ marginTop: "10rem" }}>
            {playlistsongs.length > 0 &&
              playlistsongs.map((songs, index) => (
                <div
                  style={{
                    height: "15vh",
                    backgroundColor: "rgba(0,0,0, 0.4)",
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "2px solid grey",
                    margin: "1rem 0",
                  }}>
                  <Typography
                    style={{
                      width: "50px",
                      fontSize: "20px",
                      color: "gray",
                      margin: "2rem 1rem",
                    }}>
                    {index + 1}
                  </Typography>
                  <CardMedia
                    component="img"
                    image={songs.thumbnail}
                    alt={songs.title}
                    style={{ width: "200px" }}
                  />
                  <Box
                    style={{
                      color: "white",
                      paddingLeft: "10px",
                      width: "50%",
                    }}>
                    <Typography>{songs.title}</Typography>
                    <Typography>{songs.mood.toUpperCase()}</Typography>
                  </Box>
                  <Box style={{ width: "500px" }}>
                    <Button
                      sx={{
                        borderRadius: "20px",
                        color: "white",

                        marginTop: "25px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        updateSongPlayCallback(songs._id);
                        togglePlayPause(!isPlaying);
                      }}>
                      <PlayArrowIcon />
                      Play
                    </Button>
                    {signSuccess ? (
                      <Button onClick={() => addandRemoveFavItem(songs._id)}>
                        <AddIcon style={{ color: "white" }} />
                      </Button>
                    ) : (
                      <Link to="/notsignin">
                        <Button
                          sx={{
                            borderRadius: "20px",
                            color: "white",
                            marginTop: "25px",
                            marginLeft: "50px",
                          }}>
                          <AddIcon style={{ color: "white" }} />
                        </Button>
                      </Link>
                    )}
                  </Box>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <Card
            style={{
              backgroundImage: `url(${artist.image})`,
              backgroundSize: "cover",
              backdropFilter: "blur(10px)",
            }}>
            {loader ? (
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
              </Stack>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5rem",
                  marginTop: "7rem",
                }}>
                <Card sx={{ width: 285, mx: "3rem", height: 285 }}>
                  <CardMedia
                    component="img"
                    image={artist.image}
                    alt={artist.name}
                  />
                </Card>
                <Box sx={{ width: 285 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      background: "transparent",
                      border: "none",
                      fontFamily:
                        "Sharp Grotesk Bold 20, Helvetica, Arial, sans-serif",
                      width: "fit-content",
                    }}>
                    {card}
                  </Card>
                </Box>
              </div>
            )}
            <div style={{ marginTop: "15rem" }}>
              {playlistsongs.length > 0 &&
                playlistsongs.map((songs, index) => (
                  <div
                    style={{
                      width: "100vw",
                      height: "15vh",
                      backgroundColor: "rgba(0,0,0, 0.4)",
                      display: "flex",
                      flexDirection: "row",
                      margin: "1rem 0 0 0",
                      borderBottom: "2px solid grey",
                    }}>
                    <Typography
                      style={{
                        paddingTop: "30px",
                        width: "50px",
                        paddingLeft: "20px",
                        fontSize: "20px",
                        color: "gray",
                      }}>
                      {index + 1}
                    </Typography>
                    <Card sx={{ maxWidth: 100 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={songs.thumbnail}
                          alt={songs.title}
                        />
                      </CardActionArea>
                    </Card>
                    <Card
                      sx={{
                        width: "200px",
                        background: "transparent",
                        color: "white",
                        fontSize: "20px",
                      }}>
                      <CardContent>
                        <Typography>{songs.title}</Typography>
                        <Typography>{songs.mood.toUpperCase()}</Typography>
                      </CardContent>
                    </Card>
                    <Card
                      sx={{
                        marginLeft: "42rem",
                        paddingTop: "30px",
                        background: "transparent",
                        boxShadow: "none",
                      }}>
                      <CardActions>
                        <Button
                          sx={{
                            background: "transparent",
                            borderRadius: "20px",
                            width: "80px",
                            color: "white",
                          }}
                          onClick={() => {
                            updateSongPlayCallback(songs._id);
                            togglePlayPause(!isPlaying);
                          }}>
                          <PlayArrowIcon />
                          Play
                        </Button>
                        {signSuccess ? (
                          <Button
                            onClick={() => addandRemoveFavItem(songs._id)}>
                            <AddIcon style={{ color: "white" }} />
                          </Button>
                        ) : (
                          <Link to="/notsignin">
                            <Button>
                              <AddIcon style={{ color: "white" }} />
                            </Button>
                          </Link>
                        )}
                      </CardActions>
                    </Card>
                  </div>
                ))}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
