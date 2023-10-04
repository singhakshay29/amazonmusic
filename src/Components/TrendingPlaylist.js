import { Container, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";

export default function TrendingPlaylist({ updateSongPlayCallback }) {
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
            margin: "1rem",
            display: "flex",
          }}>
          {trendingSongs.length > 0 &&
            trendingSongs.map((album, index) => (
              <>
                <CardComponent
                  album={album}
                  index={index}
                  updateSongPlayCallback={updateSongPlayCallback}
                  minWidth="10"
                />
              </>
            ))}
        </div>
      </Container>
    </>
  );
}
