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
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CardActions from "@mui/material/CardActions";
import PauseIcon from "@mui/icons-material/Pause";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useRef, memo } from "react";

export default memo(function MusicPlayerComponents({ songPlayId }) {

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMute, setIsMute] = useState(false);
  const [song, setSong] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  async function getTheDeatails(sid, sIndex = null) {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;
        console.log(songsArray);
        let filterDataRomantic = [];
        if (sIndex !== null) {
          filterDataRomantic = [songsArray[sIndex]];
        } else {
          filterDataRomantic = songsArray.filter((songs, index) => {
            if (songs._id === sid) {
              setCurrentSongIndex(index);
              return true;
            }
          });
        }

        setSong(filterDataRomantic);
        console.log(filterDataRomantic);
        console.log(filterDataRomantic[0]?.title);
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  // useEffect(() => {
  //   getTheDeatails(songPlayId);
  // }, [songPlayId]);

  

  useEffect(() => {
    getTheDeatails(songPlayId);
    if (audioRef?.current && songPlayId) {
      audioRef.current.src = `https://newton-project-resume-backend.s3.amazonaws.com/audio/${songPlayId}.mp3`;
      const isPlaying = audioRef.current.currentTime > 0 && !audioRef.current.paused && !audioRef.current.ended 
    && audioRef.current.readyState > audioRef.current.HAVE_CURRENT_DATA;
    setTimeout(()=> {
      !isPlaying && audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }, 0);
    
    }
  }, []);

  // const playPauseToggle = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     } else {
  //       audioRef.current.pause();
  //     }
  //   }
  //   setIsPlaying((prevState) => !prevState);
  // };
  const playPauseToggle = () => {
    // if (audioRef.current) {
    //   if (audioRef.current.paused) {
    //     audioRef.current.src = song[0]?.audio_url; // Set the new audio source
    //     audioRef.current.load(); // Load the new audio
    //     audioRef.current.play(); // Play the new audio
    //   } else {
    //     audioRef.current.pause();
    //   }
    // }
    // setIsPlaying((prevState) => !prevState);
  };

  // const handletimeUpdate = () => {
  //   const currentTime = audioRef.current.currentTime;
  //   const duration = audioRef.current.duration;
  //   setDuration(audioRef.current.duration);
  // };

  const muteUnmuteToggle = () => {
    setIsMute((prevState) => !prevState);
    if (audioRef.current) {
      audioRef.current.muted = !isMute;
    }
  };

  const playNextSong = () => {
    audioRef.current.pause();
    getTheDeatails("", currentSongIndex + 1);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    audioRef.current.pause();
    getTheDeatails("", currentSongIndex - 1);
    setIsPlaying(true);
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
          backgroundColor: "rgba(0,0,0, 0.4)",
          display: "flex",
          flexDirection: "row",
          margin: "1rem 0 0 0",
          marginTop: "41%",
          position: "fixed",
          zIndex: 9,
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
            {song[0]?.artist[0]?.name}
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
            {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
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
          <Button>
            <PlaylistPlayIcon style={{ fontSize: "35px", color: "white" }} />
          </Button>
        </Card>
      </div>
    </>
  );
});
