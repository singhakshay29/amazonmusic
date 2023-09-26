import {
  Box,
  Card,
  Grid,
  CardMedia,
  Container,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Podcasts({
  isPlaying,
  togglePlayPause,
  updateSongPlayCallback,
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
    <Container sx={{ mt: "4rem" }}>
      <Grid container spacing={5} sx={{ m: "0.8rem" }}>
        {songs.slice(0, page * cardsPerPage).map((song, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              m: "3rem",
              width: 300,
              maxHeight: 100,
              backgroundColor: "black",
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
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  backgroundColor: "black",
                  wordWrap: "none",
                }}>
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
