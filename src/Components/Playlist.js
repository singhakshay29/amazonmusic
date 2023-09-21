import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function Playlist({
  updateSongPlayCallback,
  togglePlayPause,
  isPlaying,
  signSuccess,
}) {
  const [songsList, setSongsList] = useState({});
  const [loader, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  const { id } = useParams();
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

  async function getTheDeatails() {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/music/album/${id}`,
      {
        headers: {
          projectId: "8jf3b15onzua",
        },
      }
    );
    const data = await response.json();
    setSongsList(data.data);
    const songsArray = data.data.songs;
    setplaylistsongs(songsArray);
    setLoader(false);
  }
  useEffect(() => {
    getTheDeatails();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const card = (
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
          {songsList.title}
        </Typography>
        <Typography sx={{ mb: 8 }} color="text.secondary"></Typography>
        <Typography variant="body2">{songsList.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            background: "rgb(37, 209, 218)",
            borderRadius: "20px",
            width: "80px",
            color: "black",
          }}>
          <PlayArrowIcon
            onClick={() => {
              updateSongPlayCallback(songsList.songs[0]?._id);
              togglePlayPause(!isPlaying);
            }}
          />
          Play
        </Button>
        {signSuccess ? (
          <Button onClick={() => addandRemoveFavItem(songsList.songs[0]?._id)}>
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
          {songsList.title}
        </Typography>
        <Typography sx={{ mb: 8 }} color="text.secondary"></Typography>
        <Typography style={{ color: "white" }} variant="body2">
          {songsList.description}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            background: "rgb(37, 209, 218)",
            borderRadius: "20px",
            width: "80px",
            color: "black",
          }}>
          <PlayArrowIcon
            onClick={() => {
              updateSongPlayCallback(songsList.songs[0]?._id);
              togglePlayPause(!isPlaying);
            }}
          />
          Play
        </Button>
        {signSuccess ? (
          <Button onClick={() => addandRemoveFavItem(songsList.songs[0]?._id)}>
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

  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              backgroundImage: `url(${songsList.image})`,
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
                image={songsList.image}
                alt={songsList.title}
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
          <div style={{ marginTop: "15rem" }}>
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
                      }}>
                      <PlayArrowIcon
                        onClick={() => {
                          updateSongPlayCallback(songs._id);
                          togglePlayPause(!isPlaying);
                        }}
                      />
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
              backgroundImage: `url(${songsList.image})`,
              backgroundSize: "cover",
              backdropFilter: "blur(6px)",
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
                  alignItems: "center", // Center content horizontally
                  padding: "2rem", // Add some padding for better spacing
                }}>
                <Card sx={{ width: 285, mx: "3rem", height: 285 }}>
                  <CardMedia
                    component="img"
                    image={songsList.image}
                    alt={songsList.title}
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
            <div>
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
                          }}>
                          <PlayArrowIcon
                            onClick={() => {
                              updateSongPlayCallback(songs._id);
                              togglePlayPause(!isPlaying);
                            }}
                          />
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

export default Playlist;
