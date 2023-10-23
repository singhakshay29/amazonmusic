import request from "../request";
import Box from "@mui/material/Box";
import ListsOfSongs from "./ListsOfSongs";
import HeroSection from "./HeroSection";
import { useLocation } from "react-router-dom";
import HeroSectionRes from "./HeroSectionRes";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Artist({ setSearchItem, updateSongPlayCallback }) {
  const location = useLocation();
  const { data } = location.state;
  const [artist, setArtist] = useState([]);
  const [loder, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  async function getTheDeatails() {
    const baseUrl = request.fetchArtistId + data._id;
    const response = await fetch(baseUrl, {
      headers: {
        projectId: "8jf3b15onzua",
      },
    });
    const artistDetails = await response.json();
    setArtist(artistDetails.data);
    const songsArray = artistDetails.data.songs;
    setplaylistsongs(songsArray);
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
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
        <>
          {isSmallScreen ? (
            <>
              <div
                className="ad1"
                style={{
                  backgroundImage: `url(${artist?.image})`,
                }}></div>
              <div className="pI">
                <img
                  src={artist?.image}
                  className="image"
                  alt={artist?.title}
                />
                <div className="iD">
                  <HeroSectionRes
                    name="Artist"
                    data={artist}
                    updateSongPlayCallback={updateSongPlayCallback}
                  />
                </div>
              </div>
              <div className="ad2">
                {playlistsongs.length > 0 &&
                  playlistsongs.map((songs, index) => (
                    <>
                      <ListsOfSongs
                        songs={songs}
                        index={index}
                        updateSongPlayCallback={updateSongPlayCallback}
                      />
                    </>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div
                className="ad3"
                style={{
                  backgroundImage: `url(${artist?.image})`,
                }}></div>
              <img
                src={artist?.image}
                alt={artist?.title}
                className="pI imgP playlistMainI"
              />
              <div className="pI playlistMainI">
                <div className="ad4">
                  <HeroSection
                    name={"Artist"}
                    data={artist}
                    updateSongPlayCallback={updateSongPlayCallback}
                  />
                </div>
              </div>
              <div style={{ width: "100%", marginBottom: "5rem" }}>
                {playlistsongs.length > 0 &&
                  playlistsongs.map((songs, index) => (
                    <>
                      <ListsOfSongs
                        songs={songs}
                        index={index}
                        updateSongPlayCallback={updateSongPlayCallback}
                      />
                    </>
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
