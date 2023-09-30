import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  MobileStepper,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const Home = ({
  isPlaying,
  hoverStates,
  signSuccess,
  setSearchItem,
  playpausesong,
  handleShowNav,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  handleTogglePlayPause,
  updateSongPlayCallback,
}) => {
  const theme = useTheme();
  const [sadData, setsadData] = useState([]);
  const [albumData, setAlbum] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const [excitedData, setExcitedData] = useState([]);
  const [romanticData, setromanticData] = useState([]);
  const [currentDataIndexSad, setCurrentDataIndexSad] = useState(0);
  const [currentDataIndexAlbum, setCurrentDataIndexAlbum] = useState(1);
  const [currentDataIndexHappy, setCurrentDataIndexHappy] = useState(0);
  const [currentDataIndexRomantic, setCurrentDataIndexRomantic] = useState(0);
  const [currentDataIndexExcited, setCurrentDataIndexExcited] = useState(0);

  const handleNext = () => {
    setCurrentDataIndexAlbum((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setCurrentDataIndexAlbum((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackR = () => {
    setCurrentDataIndexRomantic((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextH = () => {
    setCurrentDataIndexHappy((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackH = () => {
    setCurrentDataIndexHappy((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextE = () => {
    setCurrentDataIndexExcited((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackE = () => {
    setCurrentDataIndexExcited((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextS = () => {
    setCurrentDataIndexSad((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackS = () => {
    setCurrentDataIndexSad((prevActiveStep) => prevActiveStep - 1);
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
        setExcitedData(filterDataExcited);
        const filterDataHappy = songsArray.filter(
          (songs) => songs.mood === "happy"
        );
        setHappyData(filterDataHappy);

        const filterDataSad = songsArray.filter(
          (songs) => songs.mood === "sad"
        );
        setsadData(filterDataSad);
      } else {
        // Fetch data from the API
        const baseUrlSong =
          "https://academics.newtonschool.co/api/v1/music/song?limit=100";
        const response = await fetch(baseUrlSong, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const musicDataSet = data.data;

        const filterDataRomantic = musicDataSet.filter(
          (songs) => songs.mood === "romantic"
        );
        setromanticData(filterDataRomantic);

        const filterDataExcited = musicDataSet.filter(
          (songs) => songs.mood === "excited"
        );
        setExcitedData(filterDataExcited);

        const filterDataHappy = musicDataSet.filter(
          (songs) => songs.mood === "happy"
        );
        setHappyData(filterDataHappy);

        const filterDataSad = musicDataSet.filter(
          (songs) => songs.mood === "sad"
        );
        setsadData(filterDataSad);

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

  const baseUrlAlbum =
    "https://academics.newtonschool.co/api/v1/music/album?limit=100";

  async function getThedataAlbum() {
    try {
      const storedData = localStorage.getItem("albumData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setAlbum(parsedData.albumData);
      } else {
        const response = await fetch(baseUrlAlbum, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const albumDataSet = data.data;
        setAlbum(albumDataSet);

        localStorage.setItem(
          "albumData",
          JSON.stringify({
            albumData: albumDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  useEffect(() => {
    getThedataRomantic();
    getThedataAlbum();
    handleShowNav();
    setSearchItem("");

    return () => {
      getThedataRomantic();
      getThedataAlbum();
      handleShowNav();
      setSearchItem("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        padding: "0",
        margin: "6rem 0 0 1rem",
        display: "flex",
        flexDirection: "column",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0 3rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Popular Album
        </Typography>
        <MobileStepper
          variant="d"
          steps={6}
          position="static"
          activeStep={currentDataIndexAlbum}
          sx={{ maxWidth: 100, flexGrow: 1 }}
          style={{
            background: "transparent",
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={currentDataIndexAlbum === 30}
              style={{
                color: currentDataIndexAlbum === 30 ? "grey" : "white",
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
              onClick={handleBack}
              disabled={currentDataIndexAlbum === 1}
              style={{
                color: currentDataIndexAlbum === 1 ? "grey" : "white",
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
          marginTop: "1rem",
        }}>
        {albumData.length > 0 &&
          albumData
            .slice(currentDataIndexAlbum, currentDataIndexAlbum + 10)
            .map((data) => (
              <Card
                className="container"
                key={data.id}
                sx={{
                  minWidth: 166,
                  margin: "8px 20px",
                }}
                style={{ backgroundColor: "black" }}>
                <CardActionArea>
                  <div>
                    <div className="overlay"></div>

                    <Link to={`/playlist/${data._id}`}>
                      <CardMedia
                        component="img"
                        image={data.image}
                        alt={data.title}
                        style={{
                          borderRadius: "8px",
                          height: "160px",
                          width: "160px",
                        }}
                        onMouseOver={() => handleMouseEnter(data._id)}
                        onMouseLeave={() => handleMouseLeave(data._id)}
                      />
                    </Link>
                  </div>
                  {hoverStates[data._id] && (
                    <>
                      <Link to={`/playlist/${data._id}`}>
                        <Button
                          variant="contained"
                          sx={{
                            position: "absolute",
                            top: "30%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 8,
                            backdropFilter: "blur(10px)",
                            color: "white",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            boxShadow: "none",
                            width: "55px",
                            height: "60px",
                            transition: "width 0.2s ease ,height 0.2s ease",

                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.3)",
                              width: "65px",
                              height: "63px",
                            },
                          }}
                          onMouseEnter={() => handleMouseEnter(data._id)}
                          onMouseLeave={() => handleMouseLeave(data._id)}>
                          <HiChevronRight
                            style={{
                              fontSize: "2.5rem",
                              transition: "font-size 0.2s",
                            }}
                          />
                        </Button>
                      </Link>
                      {/* {signSuccess ? (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            position: "absolute",
                            top: "35%",
                            left: "20%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1,
                            background: "transparent",
                          }}
                          onMouseEnter={() => handleMouseEnter(data._id)}
                          onMouseLeave={() => handleMouseLeave(data._id)}
                          onClick={() =>
                            addandRemoveFavItem(data.songs[0]?._id)
                          }>
                          <AddIcon />
                        </Button>
                      ) : (
                        <Link to="/notsignin">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              position: "absolute",
                              top: "35%",
                              left: "20%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 1,
                              background: "transparent",
                            }}
                            onMouseEnter={() => handleMouseEnter(data._id)}
                            onMouseLeave={() => handleMouseLeave(data._id)}>
                            <AddIcon />
                          </Button>
                        </Link>
                      )} */}
                    </>
                  )}
                  <CardContent
                    style={{
                      height: "100px",
                      width: "10em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      background: "black",
                      color: "white",
                      padding: "16px 8px",
                    }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}>
                      {data.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="rgba(255, 255, 255, 0.6)">
                      {data.artists[0].name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0rem 3rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Romantic Songs
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
          marginTop: "1rem",
        }}>
        {romanticData.length > 0 &&
          romanticData
            .slice(currentDataIndexRomantic, currentDataIndexRomantic + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                isPlaying={isPlaying}
                hoverStates={hoverStates}
                signSuccess={signSuccess}
                playpausesong={playpausesong}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleTogglePlayPause={handleTogglePlayPause}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0rem 3rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Happy Songs
        </Typography>
        <MobileStepper
          variant="d"
          steps={6}
          position="static"
          activeStep={currentDataIndexHappy}
          sx={{ maxWidth: 100, flexGrow: 1 }}
          style={{ background: "transparent" }}
          nextButton={
            <Button
              size="small"
              onClick={handleNextH}
              disabled={currentDataIndexHappy === 22}
              style={{
                color: currentDataIndexHappy === 22 ? "grey" : "white",
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
              onClick={handleBackH}
              disabled={currentDataIndexHappy === 0}
              style={{
                color: currentDataIndexHappy === 0 ? "grey" : "white",
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
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {happyData.length > 0 &&
          happyData
            .slice(currentDataIndexHappy, currentDataIndexHappy + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                hoverStates={hoverStates}
                playpausesong={playpausesong}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleTogglePlayPause={handleTogglePlayPause}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0rem 3rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Excited Songs
        </Typography>
        <MobileStepper
          variant="d"
          steps={6}
          position="static"
          activeStep={currentDataIndexExcited}
          sx={{ maxWidth: 100, flexGrow: 1 }}
          style={{ background: "transparent" }}
          nextButton={
            <Button
              size="small"
              onClick={handleNextE}
              disabled={currentDataIndexExcited === 22}
              style={{
                color: currentDataIndexExcited === 22 ? "grey" : "white",
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
              onClick={handleBackE}
              disabled={currentDataIndexExcited === 0}
              style={{
                color: currentDataIndexExcited === 0 ? "grey" : "white",
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
          marginTop: "1rem",
        }}>
        {excitedData.length > 0 &&
          excitedData
            .slice(currentDataIndexExcited, currentDataIndexExcited + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                hoverStates={hoverStates}
                playpausesong={playpausesong}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleTogglePlayPause={handleTogglePlayPause}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0rem 3rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Sad Songs
        </Typography>
        <MobileStepper
          variant="d"
          steps={6}
          position="static"
          activeStep={currentDataIndexSad}
          sx={{ maxWidth: 100, flexGrow: 1 }}
          style={{ background: "transparent" }}
          nextButton={
            <Button
              size="small"
              onClick={handleNextS}
              disabled={currentDataIndexSad === 15}
              style={{
                color: currentDataIndexSad === 15 ? "grey" : "white",
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
              onClick={handleBackS}
              disabled={currentDataIndexSad === 0}
              style={{
                color: currentDataIndexSad === 0 ? "grey" : "white",
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
          marginTop: "1rem",
        }}>
        {sadData.length > 0 &&
          sadData
            .slice(currentDataIndexSad, currentDataIndexSad + 10)
            .map((album, index) => (
              <CardComponent
                album={album}
                index={index}
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                hoverStates={hoverStates}
                playpausesong={playpausesong}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleTogglePlayPause={handleTogglePlayPause}
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
