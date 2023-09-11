// src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PauseIcon from "@mui/icons-material/Pause";

const Home = ({ updateSongPlayCallback, togglePlayPause }) => {
  const [romanticData, setromanticData] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const [excitedData, setExcitedData] = useState([]);
  const [sadData, setsadData] = useState([]);
  const [trendingSongs, setTrendingSong] = useState([]);
  const [albumData, setAlbum] = useState([]);
  const [hoverStates, setHoverStates] = useState(
    Array(trendingSongs.length).fill(false)
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  async function getThedataRomantic() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;
        const filterDataRomantic = songsArray.filter(
          (songs) => songs.mood === "romantic"
        );
        // console.log(filterDataRomantic);
        setromanticData(filterDataRomantic);

        const filterDataExcited = songsArray.filter(
          (songs) => songs.mood === "excited"
        );
        setExcitedData(filterDataExcited);

        const filterDataHappy = songsArray.filter(
          (songs) => songs.mood === "happy"
        );
        setHappyData(filterDataHappy);

        const filterDataSad = songsArray.filter(
          (songs) => songs.mood === "sad"
        );
        setsadData(filterDataSad);

        const filterDataTrending = songsArray.filter(
          (songs) => songs.featured === "Trending songs"
        );
        setTrendingSong(filterDataTrending);
      } else {
        // Fetch data from the API
        const baseUrlSong =
          "https://academics.newtonschool.co/api/v1/music/song";
        const response = await fetch(baseUrlSong, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const musicDataSet = data.data;

        const filterDataRomantic = musicDataSet.filter(
          (songs) => songs.mood === "romantic"
        );
        setromanticData(filterDataRomantic);

        const filterDataExcited = musicDataSet.filter(
          (songs) => songs.mood === "excited"
        );
        setExcitedData(filterDataExcited);

        const filterDataHappy = musicDataSet.filter(
          (songs) => songs.mood === "happy"
        );
        setHappyData(filterDataHappy);

        const filterDataSad = musicDataSet.filter(
          (songs) => songs.mood === "sad"
        );
        setsadData(filterDataSad);

        const filterDataTrending = musicDataSet.filter(
          (songs) => songs.featured === "Trending songs"
        );
        setTrendingSong(filterDataTrending);

        localStorage.setItem(
          "musicData",
          JSON.stringify({
            musicData: musicDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  }

  const baseUrlAlbum = "https://academics.newtonschool.co/api/v1/music/album";
  async function getThedataAlbum() {
    try {
      const storedData = localStorage.getItem("albumData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setAlbum(parsedData.albumData);
      } else {
        const response = await fetch(baseUrlAlbum, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const albumDataSet = data.data;
        setAlbum(albumDataSet);

        localStorage.setItem(
          "albumData",
          JSON.stringify({
            albumData: albumDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  useEffect(() => {
    getThedataRomantic();
    getThedataAlbum();

    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <Container sx={{ mt: "2rem" }}>
      <Typography variant="h4">Trending Playlists</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          margin: "1rem",
        }}>
        {trendingSongs.length > 0 &&
          trendingSongs.map((album, index) => (
            <Card key={album.id} sx={{ width: 190, margin: "10px 20px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={album.thumbnail}
                  alt={album.title}
                  onMouseOver={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  style={{
                    transition: "opacity 0.1s ease",
                    opacity: hoverStates[index] ? "0.6" : "1",
                    cursor: "pointer",
                  }}></CardMedia>
                {hoverStates[index] && (
                  <>
                    <Button
                      variant="contained"
                      style={{
                        position: "absolute",
                        top: "35%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        background: "FFFFFF26",
                        color: "white",
                        borderRadius: "81%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      onClick={() => {
                        updateSongPlayCallback(album._id);
                        togglePlayPause();
                        setIsPlaying(!isPlaying);
                      }}>
                      {isPlaying ? (
                        <PauseIcon style={{ fontSize: "2.5rem" }} />
                      ) : (
                        <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
                      )}
                    </Button>
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
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}>
                      <AddIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        position: "absolute",
                        top: "35%",
                        left: "80%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        background: "transparent",
                        border: "none",
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}>
                      <MoreHorizIcon />
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
                  }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {album.artist[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <Typography variant="h4">Popular Albums</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem",
        }}>
        {albumData.length > 0 &&
          albumData.map((album) => (
            <Card key={album.id} sx={{ minWidth: 190, margin: "10px 20px" }}>
              <CardActionArea>
                <Link to={`/playlist/${album._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.image}
                    alt={album.title}
                  />
                </Link>
                <CardContent
                  style={{
                    height: "100px",
                    width: "12em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    background: "black",
                    color: "white",
                  }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ overflow: "scroll" }}>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {album.artists[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <Typography variant="h4">Featured Romantic Songs</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {romanticData.length > 0 &&
          romanticData.map((album) => (
            <Card key={album.id} sx={{ minWidth: 190, margin: "10px 20px" }}>
              <CardActionArea>
                <Link to={`/playlist/${album._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.thumbnail}
                    alt={album.title}
                  />
                </Link>
                <CardContent
                  style={{
                    height: "100px",
                    width: "12em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    background: "black",
                    color: "white",
                  }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ overflow: "scroll" }}>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {album.artist[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <Typography variant="h4">Happy Songs</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {happyData.length > 0 &&
          happyData.map((album) => (
            <Card key={album.id} sx={{ minWidth: 190, margin: "10px 20px" }}>
              <CardActionArea>
                <Link to={`/playlist/${album._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.thumbnail}
                    alt={album.title}
                  />
                </Link>
                <CardContent
                  style={{
                    height: "100px",
                    width: "12em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    background: "black",
                    color: "white",
                  }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ overflow: "scroll" }}>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {album.artist[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <Typography variant="h4">Excited Songs</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {excitedData.length > 0 &&
          excitedData.map((album) => (
            <Card key={album.id} sx={{ minWidth: 190, margin: "10px 20px" }}>
              <CardActionArea>
                <Link to={`/playlist/${album._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.thumbnail}
                    alt={album.title}
                  />
                </Link>
                <CardContent
                  style={{
                    height: "100px",
                    width: "12em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    background: "black",
                    color: "white",
                  }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ overflow: "scroll" }}>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {album.artist[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <Typography variant="h4">Sad Songs</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {sadData.length > 0 &&
          sadData.map((album) => (
            <Card key={album.id} sx={{ minWidth: 190, margin: "10px 20px" }}>
              <CardActionArea>
                <Link to={`/playlist/${album._id}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.thumbnail}
                    alt={album.title}
                  />
                </Link>
                <CardContent
                  style={{
                    height: "100px",
                    width: "12em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    background: "black",
                    color: "white",
                  }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ overflow: "scroll" }}>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {album.artist[0]?.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Home;
