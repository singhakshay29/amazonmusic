import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Podcasts({
  updateSongPlayCallback,
  togglePlayPause,
  isPlaying,
}) {
  const [songs, setSong] = useState([]);
  const [page, setPage] = useState(1);
  const cardsPerPage = 9;

  async function getTheDeatails() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        const songsArray = parsedData.musicData;

        setSong(songsArray);
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  useEffect(() => {
    getTheDeatails();
    window.addEventListener("scroll", loadMoreCards);
    return () => {
      window.removeEventListener("scroll", loadMoreCards);
    };
  });
  const loadMoreCards = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      const endIndex = page * cardsPerPage;
      setPage(page + 1);
      const nextCards = songs.slice(page * cardsPerPage, endIndex);
      setSong((prevSongs) => [...prevSongs, ...nextCards]);
    }
  };

  return (
    <Container sx={{ mt: "7rem", marginLeft: "0" }}>
      <Grid container spacing={5} sx={{ m: "0.8rem" }}>
        {songs.slice(0, page * cardsPerPage).map((song, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              m: "3rem",
              maxWidth: 300,
              maxHeight: 100,
            }}>
            <CardMedia
              component="img"
              sx={{ width: 100 }}
              image={song.thumbnail}
              alt={song.title}
              onClick={() => {
                updateSongPlayCallback(song._id);
                togglePlayPause(!isPlaying);
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto", backgroundColor: "black" }}>
                <Typography
                  component="div"
                  variant="h6"
                  style={{ color: "white" }}>
                  {song.title}
                </Typography>
                <Typography variant="caption" color="grey" component="div">
                  {song.artist[0]?.name}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
