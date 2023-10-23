import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import request from "../request";
import HeroSection from "./HeroSection";
import HeroSectionRes from "./HeroSectionRes";
import ListsOfSongs from "./ListsOfSongs";

export default function SearchAlbum({ setSearchItem, updateSongPlayCallback }) {
  const location = useLocation();
  const { data } = location.state;
  const [loder, setLoader] = useState(true);
  const [songsList, setSongsList] = useState({});
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);

  const baseUrl = request.fetchAlbumId + data.album;

  async function getTheDeatails() {
    const response = await fetch(baseUrl, {
      headers: {
        projectId: "8jf3b15onzua",
      },
    });
    const data = await response.json();
    const songsArray = data.data.songs;
    setSongsList(data.data);
    setplaylistsongs(songsArray);
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };
    const handleEffects = () => {
      setSearchItem("");
      getTheDeatails();
    };
    window.addEventListener("resize", handleResize);
    handleEffects();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loder ? (
        <>
          <Box className="loderbox">
            <CircularProgress sx={{ color: "rgb(37, 209, 218)" }} />
          </Box>
        </>
      ) : (
        <></>
      )}
      {isSmallScreen ? (
        <>
          <div
            className="ad1"
            style={{
              backgroundImage: `url(${songsList.image})`,
            }}></div>
          <div className="pI">
            <img
              src={songsList?.image}
              className="image"
              alt={songsList?.title}
            />
            <div className="iD">
              <HeroSectionRes
                name="Playlist"
                data={songsList}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            </div>
          </div>
          <div className="ad2">
            {playlistsongs.length > 0 &&
              playlistsongs.map((songs, index) => (
                <ListsOfSongs
                  songs={songs}
                  index={index}
                  updateSongPlayCallback={updateSongPlayCallback}
                />
              ))}
          </div>
        </>
      ) : (
        <>
          <div
            className="ad3"
            style={{
              backgroundImage: `url(${songsList?.image})`,
            }}></div>
          <img
            src={songsList?.image}
            alt={songsList?.title}
            className="pI imgP playlistMainI"
          />
          <div className="pI playlistMainI">
            <div className="ad4">
              <HeroSection
                name="Playlist"
                data={songsList}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              marginBottom: "5rem",
            }}>
            {playlistsongs.length > 0 &&
              playlistsongs.map((songs, index) => (
                <ListsOfSongs
                  songs={songs}
                  index={index}
                  updateSongPlayCallback={updateSongPlayCallback}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
}
