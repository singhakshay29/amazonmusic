import * as React from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LoopIcon from "@mui/icons-material/Loop";
import ShuffleSharpIcon from "@mui/icons-material/ShuffleSharp";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CardActions from "@mui/material/CardActions";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useRef, memo } from "react";

export default memo(function MusicPlayA({ songPlayId }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMute, setIsMute] = useState(false);
  const [song, setSong] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  async function getTheDeatails(sid, sIndex = null) {
    try {
      const storedDataAlbum = localStorage.getItem("albumData");
      if (storedDataAlbum) {
        const parsedData = JSON.parse(storedDataAlbum);
        const songsArray = parsedData.albumData;
        console.log(songsArray);
        let filterDataRomantic = [];
        if (sIndex !== null) {
          filterDataRomantic = [songsArray[sIndex]];
        } else {
          filterDataRomantic = songsArray.filter((item) => {
            const filterDataSong = item.songs.filter((song, index) => {
              if (song === sid) {
                setCurrentSongIndex(index);
                return true;
              }
              return false;
            });
            return filterDataSong;
          });
          setSong(filterDataRomantic);
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  useEffect(() => {
    getTheDeatails(songPlayId);
  }, [songPlayId]);

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

  const playLoopSong = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "15vh",
          backgroundColor: "rgba(15,17,17,.6)",
          display: "flex",
          flexDirection: "row",
          margin: "1rem 0 0 0",
          marginTop: "46%",
          position: "fixed",
          zIndex: 9,
          backdropFilter: "blur(30px)",
        }}>
        <CardMedia
          component="img"
          sx={{ height: "100px", width: "120px" }}
          image={song[0]?.thumbnail}
          title={song[0]?.title}
        />

        <CardContent sx={{ minWidth: 200 }}>
          <Typography style={{ color: "white" }}>{song[0]?.title}</Typography>
          <Typography variant="caption" style={{ color: "grey" }}>
            {/* {song[0]?.artist[0]?.name} */}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            marginLeft: "150px",
          }}>
          <Button
            sx={{
              background: "transparent",
              borderRadius: "20px",
              width: "80px",
              color: "white",
            }}
            onClick={playLoopSong}>
            <LoopIcon />
          </Button>
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
          <Button
            sx={{
              background: "transparent",
              borderRadius: "20px",
              color: "white",
            }}>
            <ShuffleSharpIcon />
          </Button>
        </CardActions>

        <Card
          sx={{
            background: "transparent",
            color: "black",
            display: "flex",
            paddingLeft: "20px",
            minWidth: 200,
            marginLeft: "230px",
          }}>
          <Button onClick={muteUnmuteToggle}>
            {isMute ? (
              <VolumeOffIcon style={{ fontSize: "35px", color: "white" }} />
            ) : (
              <VolumeUpIcon style={{ fontSize: "35px", color: "white" }} />
            )}
          </Button>
        </Card>
      </div>
    </>
  );
});
