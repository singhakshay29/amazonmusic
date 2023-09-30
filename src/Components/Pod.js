import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  MobileStepper,
  CardActionArea,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function Pod({
  isPlaying,
  hoverStates,
  signSuccess,
  setSearchItem,
  handleShowNav,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  updateSongPlayCallback,
}) {
  const theme = useTheme();
  const [romanticData, setromanticData] = useState([]);
  const [currentDataIndexRomantic, setCurrentDataIndexRomantic] = useState(0);
  const handleNextR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep - 1);
  };
  async function getThedataRomantic() {
    try {
      const storedData = localStorage.getItem("musicData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const songsArray = parsedData.musicData;
        const filterDataRomantic = songsArray.filter(
          (songs) => songs.mood === "romantic"
        );
        setromanticData(filterDataRomantic);

        const filterDataExcited = songsArray.filter(
          (songs) => songs.mood === "excited"
        );
        // setExcitedData(filterDataExcited);
        const filterDataHappy = songsArray.filter(
          (songs) => songs.mood === "happy"
        );
        // setHappyData(filterDataHappy);

        const filterDataSad = songsArray.filter(
          (songs) => songs.mood === "sad"
        );
      }
    } catch (error) {
      console.error("Something went wrong");
    }
  }
  // setsadData(filterDataSad);
  //   } else {
  //     // Fetch data from the API
  //     const baseUrlSong =
  //       "https://academics.newtonschool.co/api/v1/music/song?limit=100";
  //     const response = await fetch(baseUrlSong, {
  //       method: "GET",
  //       headers: {
  //         projectId: "8jf3b15onzua",
  //       },
  //     });
  //     const data = await response.json();
  //     const musicDataSet = data.data;

  //     const filterDataRomantic = musicDataSet.filter(
  //       (songs) => songs.mood === "romantic"
  //     );
  //     setromanticData(filterDataRomantic);

  //     const filterDataExcited = musicDataSet.filter(
  //       (songs) => songs.mood === "excited"
  //     );
  //     // setExcitedData(filterDataExcited);

  //     const filterDataHappy = musicDataSet.filter(
  //       (songs) => songs.mood === "happy"
  //     );
  //     // setHappyData(filterDataHappy);

  //     const filterDataSad = musicDataSet.filter(
  //       (songs) => songs.mood === "sad"
  //     );
  //     // setsadData(filterDataSad);

  //     localStorage.setItem(
  //       "musicData",
  //       JSON.stringify({
  //         musicData: musicDataSet,
  //       })
  //     );

  useEffect(() => {
    getThedataRomantic();
  }, []);
  return (
    <>
      <div
        style={{
          margin: "6rem 0 0 1rem",
          display: "flex",
          flexDirection: "column",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "2rem 3rem 0 1rem",
          }}>
          <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
            Most Popular Podcasts
          </Typography>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexRomantic}
            sx={{ maxWidth: 100, flexGrow: 1 }}
            style={{ background: "transparent" }}
            nextButton={
              <Button
                size="small"
                onClick={handleNextR}
                disabled={currentDataIndexRomantic === 15}
                style={{
                  color: currentDataIndexRomantic === 15 ? "grey" : "white",
                }}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBackR}
                disabled={currentDataIndexRomantic === 0}
                style={{
                  color: currentDataIndexRomantic === 0 ? "grey" : "white",
                }}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
            marginTop: "2rem",
          }}>
          {romanticData.length > 0 &&
            romanticData
              .slice(currentDataIndexRomantic, currentDataIndexRomantic + 10)
              .map((album, index) => (
                <CardComponent
                  album={album}
                  index={index}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  hoverStates={hoverStates}
                  updateSongPlayCallback={updateSongPlayCallback}
                  togglePlayPause={togglePlayPause}
                  isPlaying={isPlaying}
                  signSuccess={signSuccess}
                />
              ))}
        </div>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "22px",
            m: "2rem 3rem 0 1rem",
            margin: "2rem",
          }}
          variant="h4">
          Find Podcasts in
        </Typography>
        <div className="bb">
          <button className="spb ">Sports</button>
          <button className="spb ">News</button>
          <button className="spb ">Comedy</button>
          <button className=" spb">True Crime</button>
          <button className=" spb">Health & fitness</button>
          <button className="spb ">Technology</button>
          <button className="spb ">Government</button>
          <button className="spb ">Education</button>
          <button className="spb ">Kids & Family</button>
          <button className="spb ">Science</button>
          <button className="spb ">History</button>
          <button className="spb ">Society & Culture</button>
          <button className="spb ">Religion & Spirituality</button>
        </div>
      </div>
    </>
  );
}
