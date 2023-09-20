import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import ShareIcon from "@mui/icons-material/Share";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Artist({
  setSearchItem,
  updateSongPlayCallback,
  togglePlayPause,
  isPlaying,
}) {
  const [loader, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [artist, setArtist] = useState({});
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  setSearchItem("");

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
    console.log(songId);
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
    getTheDeatails();
  }, []);

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
        <Button>
          <AddIcon style={{ color: "black" }} />
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
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
        <div>
          {playlistsongs.map((songs, index) => (
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
                  <Button onClick={() => addandRemoveFavItem(songs._id)}>
                    <AddIcon style={{ color: "white" }} />
                  </Button>
                  <Button>
                    <ShareIcon style={{ color: "white" }} />
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
