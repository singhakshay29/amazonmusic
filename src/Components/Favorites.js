import { Card } from "@mui/material";
import React from "react";
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
import mylikes from "../assests/mylikes.png";
import { useState, useEffect } from "react";

export default function Favorites({
  updateSongPlayCallback,
  togglePlayPause,
  isPlaying,
}) {
  const [songsList, setSongsList] = useState({});
  const [loader, setLoader] = useState(false);
  const [playlistsongs, setplaylistsongs] = useState([]);

  const baseUrlSong =
    "https://academics.newtonschool.co/api/v1/music/favorites/like";

  async function getTheFavList() {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      console.log(parsedData);
      const response = await fetch(baseUrlSong, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.signup.token}`,
          projectId: "8jf3b15onzua",
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data.data);
      setplaylistsongs(data.data?.songs);
    }
  }

  useEffect(() => {
    getTheFavList();
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
              updateSongPlayCallback(songsList?.songs[0]?._id);
              togglePlayPause(!isPlaying);
            }}
          />
          Play
        </Button>
        <Button>
          <AddIcon style={{ color: "black" }} />
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Card
      style={{
        marginTop: "3rem",
        backgroundImage: `url(${mylikes})`,
        backgroundSize: "cover",
        // height: "100vh",
      }}>
      {loader ? (
        <Stack sx={{ color: "grey" }} spacing={2} direction="row">
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
            <CardMedia component="img" image={mylikes} alt="myFav" />
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
                  <Button>
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
  );
}
