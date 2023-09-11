import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import PauseIcon from "@mui/icons-material/Pause";
import { Button } from "@mui/material";

export default function Podcasts() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSong] = useState([]);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveSongIndex] = useState();
  const cardsPerPage = 9;

  async function getTheDeatails() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        const songsArray = parsedData.musicData;
        console.log(songsArray);
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

  const handlePlayPause = (index) => {
    console.log(index);
    setActiveSongIndex(index);
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      <Grid container spacing={5} sx={{ m: "1rem" }}>
        {songs.slice(0, page * cardsPerPage).map((song, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              m: "3rem",
              maxWidth: 300,
              maxHeight: 200,
            }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={song.thumbnail}
              alt={song.title}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  pb: 1,
                  backgroundColor: "black",
                }}>
                <IconButton aria-label="previous" style={{ color: "white" }}>
                  {theme.direction === "rtl" ? (
                    <SkipNextIcon />
                  ) : (
                    <SkipPreviousIcon />
                  )}
                </IconButton>
                <Button
                  aria-label="play/pause"
                  style={{ color: "white" }}
                  onClick={() => handlePlayPause(index)}>
                  {activeIndex === index && isPlaying ? (
                    <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
                </Button>
                <IconButton aria-label="next" style={{ color: "white" }}>
                  {theme.direction === "rtl" ? (
                    <SkipPreviousIcon />
                  ) : (
                    <SkipNextIcon />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))}
      </Grid>
    </>
  );
}
