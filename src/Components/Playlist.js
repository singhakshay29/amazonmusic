import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ListsOfSongs from "./ListsOfSongs";
import HeroSectionRes from "./HeroSectionRes";
import HeroSection from "./HeroSection";
import request from "../request";

function Playlist({ updateSongPlayCallback, setSearchItem }) {
  const location = useLocation();
  const { data } = location.state;
  const [loder, setLoader] = useState(true);
  const [songsList, setSongsList] = useState({});
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);
  async function getTheDeatails() {
    const baseUrl = request.fetchAlbumId + data._id;
    const response = await fetch(baseUrl, {
      headers: {
        projectId: "8jf3b15onzua",
      },
    });
    const result = await response.json();
    setSongsList(result?.data);
    const songsArray = result.data?.songs;
    setplaylistsongs(songsArray);
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };
    setSearchItem("");

    getTheDeatails();

    window.addEventListener("resize", handleResize);

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
                  backgroundImage: `url(${songsList?.image})`,
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
                {playlistsongs?.length > 0 &&
                  playlistsongs?.map((songs, index) => (
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
      )}
    </>
  );
}

export default Playlist;
