import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const Home = ({
  updateSongPlayCallback,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  isPlaying,
  hoverStates,
  handleShowNav,
  signSuccess,
  setSearchItem,
}) => {
  const [romanticData, setromanticData] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const [excitedData, setExcitedData] = useState([]);
  const [sadData, setsadData] = useState([]);
  const [albumData, setAlbum] = useState([]);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const theme = useTheme();
  const [currentDataIndexAlbum, setCurrentDataIndexAlbum] = useState(1);
  const [currentDataIndexRomantic, setCurrentDataIndexRomantic] = useState(0);
  const [currentDataIndexHappy, setCurrentDataIndexHappy] = useState(0);
  const [currentDataIndexExcited, setCurrentDataIndexExcited] = useState(0);
  const [currentDataIndexSad, setCurrentDataIndexSad] = useState(0);

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
  setSearchItem("");
  const baseUrlSong =
    "https://academics.newtonschool.co/api/v1/music/favorites/like";
  async function addandRemoveFavItem(songId) {
    console.log(songId);
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);

      const response = await fetch(baseUrlSong, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedData.signup.token}`,
          projectid: "8jf3b15onzua",
        },
        body: JSON.stringify({ songId: songId }),
      });
    }
  }
  const baseUrlAlbum =
    "https://academics.newtonschool.co/api/v1/music/album?limit=100";
  handleShowNav();
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
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    getThedataRomantic();
    getThedataAlbum();
  }, []);

  return (
    <Container sx={{ mt: "7rem" }}>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
          Popular Album
        </Typography>
        <MobileStepper
          variant="d"
          steps={6}
          position="static"
          activeStep={currentDataIndexAlbum}
          sx={{ maxWidth: 100, flexGrow: 1 }}
          style={{ background: "transparent" }}
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
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
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
                  {hoverStates[data._id] && (
                    <>
                      <Link to={`/playlist/${data._id}`}>
                        <Button
                          variant="contained"
                          style={{
                            position: "absolute",
                            top: "35%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 8,
                            background: "FFFFFF26",
                            color: "white",
                            borderRadius: "81%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            boxShadow: "none",
                          }}
                          onMouseEnter={() => handleMouseEnter(data._id)}
                          onMouseLeave={() => handleMouseLeave(data._id)}>
                          <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
                        </Button>
                      </Link>
                      {signSuccess ? (
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
                      )}
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
                      style={{ overflow: "scroll" }}>
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
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
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
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem",
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
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
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
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {happyData.length > 0 &&
          happyData
            .slice(currentDataIndexHappy, currentDataIndexHappy + 10)
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
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
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
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem",
        }}>
        {excitedData.length > 0 &&
          excitedData
            .slice(currentDataIndexExcited, currentDataIndexExcited + 10)
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
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
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
      </Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem",
        }}>
        {sadData.length > 0 &&
          sadData
            .slice(currentDataIndexSad, currentDataIndexSad + 10)
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
    </Container>
  );
};

export default Home;
