import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { Link } from "react-router-dom";

function Playlist() {
  const [songsList, setSongsList] = useState({});
  const [loader, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);

  const { id } = useParams();
  console.log(id);

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
    console.log(songsArray);
    setplaylistsongs(songsArray);
    setLoader(false);
  }
  useEffect(() => {
    getTheDeatails();
  }, []);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontWeight: "20px" }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Playlist
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: "60px", fontWeight: "bold", color: "white" }}
          component="div">
          {songsList.title}
        </Typography>
        <Typography sx={{ mb: 11 }} color="text.secondary">
          {/* {songsList.artists[0]?.name},{songsList.artists[1]?.name},
          {songsList.artists[3]?.name} */}
        </Typography>
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
            }}>
            <PlayArrowIcon /> Play
          </Button>
        </Link>
        <Button>
          <AddIcon style={{ color: "black" }} />
        </Button>
        <Button>
          <ShareIcon style={{ color: "black" }} />
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
        }}>
        {loader ? (
          <p className="loader">Loading...</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "5rem",
            }}>
            <div style={{ marginTop: "6rem" }}>
              <Card sx={{ maxWidth: 295, mx: "4rem" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={songsList.image}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </div>
            <div
              style={{
                height: "140",
                marginTop: "6rem",
              }}>
              <Box sx={{ minWidth: 475 }}>
                <Card
                  variant="outlined"
                  sx={{
                    background: "transparent",
                    border: "none",
                    fontFamily:
                      "Sharp Grotesk Bold 20, Helvetica, Arial, sans-serif",
                  }}>
                  {card}
                </Card>
              </Box>
            </div>
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
                      <Link to={`/musicplayer/${songs._id}`}>
                        <PlayArrowIcon /> Play
                      </Link>
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

export default Playlist;
