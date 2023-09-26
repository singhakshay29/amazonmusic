import {
  Box,
  Card,
  Stack,
  Button,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function SearchAlbum({
  isPlaying,
  setSearchItem,
  togglePlayPause,
  updateSongPlayCallback,
}) {
  setSearchItem("");
  const location = useLocation();
  const { data } = location.state;
  const [loader, setLoader] = useState(true);
  const [songsList, setSongsList] = useState({});
  const [playlistsongs, setplaylistsongs] = useState([]);

  const baseUrl = `https://academics.newtonschool.co/api/v1/music/album/${data.album}`;

  async function getTheDeatails() {
    const response = await fetch(baseUrl, {
      headers: {
        projectId: "8jf3b15onzua",
      },
    });
    const data = await response.json();
    setSongsList(data.data);
    const songsArray = data.data.songs;
    setplaylistsongs(songsArray);
    setLoader(false);
  }
  useEffect(() => {
    getTheDeatails();
    // eslint-disable-next-line
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
        <Link to={"/musicplayer/"}>
          <Button
            sx={{
              background: "rgb(37, 209, 218)",
              borderRadius: "20px",
              width: "80px",
              color: "black",
            }}
            onClick={() => {
              updateSongPlayCallback(songsList.songs[0]?._id);
              togglePlayPause(!isPlaying);
            }}>
            <PlayArrowIcon /> Play
          </Button>
        </Link>
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
          backgroundImage: `url(${songsList.image})`,
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
                      <PlayArrowIcon /> Play
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
    </>
  );
}
