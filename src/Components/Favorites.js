import Box from "@mui/material/Box";
import HeroSection from "./HeroSection";
import DataContext from "../DataContext";
import ListsOfSongs from "./ListsOfSongs";
import mylikes from "../assests/mylikes.png";
import HeroSectionRes from "./HeroSectionRes";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect, useContext } from "react";

export default function Favorites({ updateSongPlayCallback }) {
  const { loader, playlistsongs } = useContext(DataContext);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loader ? (
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
                  backgroundImage: `url(${mylikes})`,
                }}></div>
              <div className="pI">
                <img src={mylikes} className="image" alt="Likes" />
                <div className="iD">
                  <HeroSectionRes
                    fav="fav"
                    data={playlistsongs}
                    name="Playlist"
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
                  backgroundImage: `url(${mylikes})`,
                }}></div>
              <img
                src={mylikes}
                alt="mylikes"
                className="pI imgP playlistMainI"
              />
              <div className="pI playlistMainI">
                <div
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                    marginLeft: "2rem",
                  }}>
                  <HeroSection
                    name="Playlist"
                    fav="fav"
                    data={playlistsongs}
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
