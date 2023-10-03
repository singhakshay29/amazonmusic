import {
  Card,
  Button,
  Typography,
  CardActions,
  CardContent,
  ListItem,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import React, { useEffect, useState, memo, useContext, useRef } from "react";
import AuthContext from "../AuthContex";
import { useLocation } from "react-router-dom";

export default memo(function MusicPlayerComponents({ songPlayId }) {
  const audioRef = useRef();
  const location = useLocation();
  const [song, setSong] = useState([]);
  const [isMute, setIsMute] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 660);
  const { isPlaying, setIsPlaying, handleSongEnd } = useContext(AuthContext);

  async function getTheDeatails(sid, sIndex = null) {
    try {
      const storedData = localStorage.getItem("musicData");
      let filterDataRomantic = [];
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;

        if (sIndex !== null) {
          filterDataRomantic = [songsArray[sIndex]];
        } else {
          filterDataRomantic = songsArray.filter((songs, index) => {
            if (songs._id === sid) {
              setCurrentSongIndex(index);
              return true;
            }
            return false;
          });
        }
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        setSong(filterDataRomantic);
        setIsPlaying(false);

        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            // Reset the audio time
            audioRef.current.play();
            setIsPlaying(true);
          }
        }, 100);
      }

      if (filterDataRomantic.length === 0) {
        const storedDataAlbum = localStorage.getItem("albumData");
        let filterSongsById = [];
        if (storedDataAlbum) {
          const parsedData = JSON.parse(storedDataAlbum);
          const songsArray = parsedData.albumData;
          if (sIndex !== null) {
            filterDataRomantic = [songsArray[sIndex]];
          } else {
            let broken = false;
            // eslint-disable-next-line
            filterDataRomantic = songsArray.map((data, index) => {
              if (broken) {
                // eslint-disable-next-line
                return;
              }
              if (data?.songs?.length > 0) {
                filterSongsById = data.songs.filter((song) => {
                  if (song._id === sid) {
                    setCurrentSongIndex(index);
                    return true;
                  }
                  return false;
                });
              }
              if (filterSongsById.length > 0) {
                broken = true;
                // eslint-disable-next-line
                return;
              }
            });
          }
        }
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
        }
        setSong(filterSongsById);
        setIsPlaying(false);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            // Reset the audio time
            audioRef.current.play();
            setIsPlaying(true);
          }
        }, 100);
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  useEffect(() => {
    getTheDeatails(songPlayId);
    // eslint-disable-next-line
  }, [songPlayId]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 660);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // eslint-disable-next-line
      audioRef.current.removeEventListener("ended", handleSongEnd);
    };
    // eslint-disable-next-line
  }, []);

  const playPauseToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying((prevState) => !prevState);
  };

  const muteUnmuteToggle = () => {
    setIsMute((prevState) => !prevState);
    if (audioRef.current) {
      audioRef.current.muted = !isMute;
    }
  };

  const playNextSong = () => {
    audioRef.current.pause();
    getTheDeatails("", currentSongIndex + 1);
    setIsPlaying(false);
  };

  const playPreviousSong = () => {
    audioRef.current.pause();
    getTheDeatails("", currentSongIndex - 1);
    setIsPlaying(false);
  };

  if (
    location.pathname === "/subscription" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup"
  ) {
    return null;
  }

  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              width: "100vw",
              height: "15vh",
              backgroundColor: "rgba(15,17,17,.6)",
              display: "flex",
              flexDirection: "row",
              bottom: 0,
              position: "fixed",
              zIndex: 9,
              backdropFilter: "blur(30px)",
              flexGrow: "1",
            }}>
            <ListItem sx={{ padding: 0, maxWidth: 120 }}>
              <img
                src={song[0]?.thumbnail}
                alt={song[0]?.title}
                style={{
                  maxWidth: 100,
                  maxHeight: 80,
                  borderRadius: "4px",
                }}
              />
            </ListItem>
            <ListItem
              sx={{
                maxWidth: 320,
                overflow: "hidden",
                padding: 0,
              }}>
              <Typography
                style={{
                  color: "white",
                  padding: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 150,
                }}>
                {song[0]?.title}
              </Typography>
            </ListItem>
            <ListItem
              sx={{
                maxWidth: 200,
                display: "flex",
                justifyContent: "center",
              }}>
              <CardActions sx={{ flexGrow: 1, maxWidth: 180 }}>
                <SkipPreviousIcon onClick={playPreviousSong} />

                <Button
                  sx={{
                    background: "transparent",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  onClick={playPauseToggle}>
                  <audio ref={audioRef} src={song[0]?.audio_url} />
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                <SkipNextIcon onClick={playNextSong} />
                <Button onClick={muteUnmuteToggle}>
                  {isMute ? (
                    <VolumeOffIcon
                      style={{ fontSize: "25px", color: "white" }}
                    />
                  ) : (
                    <VolumeUpIcon
                      style={{ fontSize: "25px", color: "white" }}
                    />
                  )}
                </Button>
              </CardActions>
            </ListItem>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "100vw",
              minHeight: "15vh",
              backgroundColor: "rgba(15,17,17,.6)",
              display: "flex",
              flexDirection: "row",
              margin: "1rem 0 0 0",
              bottom: 0,
              position: "fixed",
              zIndex: 9,
              backdropFilter: "blur(30px)",
              flexGrow: "1",
            }}>
            <ListItem sx={{ maxWidth: 130 }}>
              <img
                src={song[0]?.thumbnail}
                alt={song[0]?.title}
                style={{
                  maxWidth: "100px",
                  borderRadius: "4px",
                  maxHeight: 80,
                }}
              />
            </ListItem>
            <ListItem sx={{ maxWidth: 180 }}>
              <CardContent sx={{ minWidth: 150, padding: 0 }}>
                <Typography style={{ color: "white" }}>
                  {song[0]?.title}
                </Typography>
                <Typography variant="caption" style={{ color: "grey" }}>
                  {song[0]?.artist[0]?.name}
                </Typography>
              </CardContent>
            </ListItem>
            <ListItem
              sx={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                maxWidth: 800,
              }}>
              <CardActions>
                {/* <Button
                sx={{
                  background: "transparent",
                  borderRadius: "20px",
                  width: "80px",
                  color: "white",
                }}
                onClick={playLoopSong}>
                <LoopIcon />
              </Button> */}
                <Button
                  sx={{
                    background: "transparent",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  onClick={playPreviousSong}>
                  <SkipPreviousIcon />
                </Button>
                <Button
                  sx={{
                    background: "transparent",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  onClick={playPauseToggle}>
                  <audio ref={audioRef} src={song[0]?.audio_url} />
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
                <Button
                  sx={{
                    background: "transparent",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  onClick={playNextSong}>
                  <SkipNextIcon />
                </Button>
                {/* <Button
                sx={{
                  background: "transparent",
                  borderRadius: "20px",
                  color: "white",
                }}>
                <ShuffleSharpIcon />
              </Button> */}
              </CardActions>
            </ListItem>
            <ListItem sx={{ maxWidth: 200 }}>
              <Card
                sx={{
                  background: "transparent",
                  color: "black",
                  display: "flex",
                  paddingLeft: "20px",

                  boxShadow: "none",
                }}>
                <Button sx={{ boxShadow: "none" }} onClick={muteUnmuteToggle}>
                  {isMute ? (
                    <VolumeOffIcon
                      style={{
                        fontSize: "35px",
                        color: "white",
                        boxShadow: "none",
                      }}
                    />
                  ) : (
                    <VolumeUpIcon
                      style={{
                        fontSize: "35px",
                        color: "white",
                        boxShadow: "none",
                      }}
                    />
                  )}
                </Button>
              </Card>
            </ListItem>
          </div>
        </>
      )}
    </>
  );
});
