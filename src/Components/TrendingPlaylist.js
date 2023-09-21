import React from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";

export default function TrendingPlaylist({
  handleMouseEnter,
  handleMouseLeave,
  updateSongPlayCallback,
  togglePlayPause,
  hoverStates,
  isPlaying,
}) {
  const [trendingSongs, setTrendingSong] = useState([]);

  async function getThedataRomantic() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;
        const filterDataTrending = songsArray.filter(
          (songs) => songs.featured === "Trending songs"
        );
        setTrendingSong(filterDataTrending);
      } else {
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

  useEffect(() => {
    getThedataRomantic();
  }, []);
  return (
    <>
      <Container sx={{ mt: "7rem" }}>
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
              <Card
                key={album.id}
                sx={{
                  width: 190,
                  margin: "10px 20px",
                  background: "transparent",
                }}
                className="container">
                <CardActionArea>
                  <div className="overlay"></div>
                  <CardMedia
                    component="img"
                    height="200"
                    image={album.thumbnail}
                    alt={album.title}
                    onMouseOver={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    style={{
                      borderRadius: "8px",
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
                          togglePlayPause(!isPlaying);
                        }}>
                        <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
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
                    <Typography
                      variant="body2"
                      color="rgba(255, 255, 255, 0.6)">
                      {album.artist[0].name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </div>
      </Container>
    </>
  );
}
