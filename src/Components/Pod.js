import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import { Link, useLocation } from "react-router-dom";
import HeadingComponent from "./HeadingComponent";

export default function Pod({ updateSongPlayCallback }) {
  const location = useLocation();
  const [romanticData, setromanticData] = useState([]);
  const [currentDataIndexRomantic, setCurrentDataIndexRomantic] = useState(0);

  const handleNextR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep - 1);
  };
  const queryParams = new URLSearchParams(location.search);
  const mood = queryParams.get("mood");

  useEffect(() => {
    async function getThedataRomantic() {
      try {
        const storedData = localStorage.getItem("musicData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const songsArray = parsedData.musicData;
          let filterData = [];
          if (mood === "party") {
            filterData = songsArray.filter((songs) => songs.mood === "happy");
          } else if (!mood || mood === "chill") {
            filterData = songsArray.filter((songs) => songs.mood === "excited");
          } else {
            filterData = songsArray.filter((songs) => songs.mood === mood);
          }
          setromanticData(filterData);
        }
      } catch (error) {
        console.error("Something went wrong");
      }
    }

    getThedataRomantic();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="hd1">
        <HeadingComponent
          heading={mood ? mood : "Most Popular Podacast"}
          handleNext={handleNextR}
          handleBack={handleBackR}
          currentData={currentDataIndexRomantic}
        />
        <div className="hd3">
          {romanticData.length > 0 &&
            romanticData
              .slice(currentDataIndexRomantic, currentDataIndexRomantic + 10)
              .map((album, index) => (
                <CardComponent
                  album={album}
                  index={index}
                  updateSongPlayCallback={updateSongPlayCallback}
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
          <Link to="/comingSoon">
            <button className="spb ">Sports</button>
            <button className="spb ">News</button>
            <button className="spb ">Comedy</button>
            <button className="spb ">True Crime</button>
            <button className="spb ">Health & fitness</button>
            <button className="spb ">Technology</button>
            <button className="spb ">Government</button>
            <button className="spb ">Education</button>
            <button className="spb ">Kids & Family</button>
            <button className="spb ">Science</button>
            <button className="spb ">History</button>
            <button className="spb ">Society & Culture</button>
            <button className="spb ">Religion & Spirituality</button>
          </Link>
        </div>
      </div>
    </>
  );
}
