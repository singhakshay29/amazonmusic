// src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";

const Home = ({
  updateSongPlayCallback,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  isPlaying,
  hoverStates,
}) => {
  const [romanticData, setromanticData] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const [excitedData, setExcitedData] = useState([]);
  const [sadData, setsadData] = useState([]);
  const [albumData, setAlbum] = useState([]);

  async function getThedataRomantic() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;
        const filterDataRomantic = songsArray.filter(
          (songs) => songs.mood === "romantic"
        );
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
  }, []);

  return (
    <Container sx={{ mt: "2rem" }}>
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
          romanticData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
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
          happyData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
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
          excitedData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
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
          sadData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
          ))}
      </div>
    </Container>
  );
};

export default Home;
