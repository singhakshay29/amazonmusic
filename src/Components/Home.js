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
import React, { useContext, useEffect, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AuthContext from "../AuthContex";

const Home = ({ setSearchItem, updateSongPlayCallback }) => {
  const theme = useTheme();
  const [sadData, setsadData] = useState([]);
  const [albumData, setAlbum] = useState([]);
  const [artistData, setArtist] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const {
    setSeeAllData,
    hoverStates,
    handleMouseEnter,
    handleMouseLeave,
    setHeading,
  } = useContext(AuthContext);
  const [excitedData, setExcitedData] = useState([]);
  const [romanticData, setromanticData] = useState([]);
  const [currentDataIndexSad, setCurrentDataIndexSad] = useState(0);
  const [currentDataIndexAlbum, setCurrentDataIndexAlbum] = useState(1);
  const [currentDataIndexArtist, setCurrentDataIndexArtist] = useState(0);
  const [currentDataIndexHappy, setCurrentDataIndexHappy] = useState(0);
  const [currentDataIndexRomantic, setCurrentDataIndexRomantic] = useState(0);
  const [currentDataIndexExcited, setCurrentDataIndexExcited] = useState(0);

  const handleNext = () => {
    setCurrentDataIndexAlbum((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setCurrentDataIndexAlbum((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextA = () => {
    setCurrentDataIndexArtist((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBackA = () => {
    setCurrentDataIndexArtist((prevActiveStep) => prevActiveStep - 1);
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

  const handleData = (data, heading) => {
    setSeeAllData(data);
    setHeading(heading);
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
  const singersToFilter = [
    "DIVINE",
    "Sukhwinder Singh",
    "Salim Merchant",
    "K.K.",
    "Anushka Manchanda",
    "Alka Yagnik",
    "Udit Narayan",
    "Mithoon",
    "Sonu Nigam",
    "Shankar Mahadevan",
    "Jubin Nautiyal",
    "Tanishk Bagchi",
    "Darshan Raval",
    "Vishal-Shekhar",
    "Shekhar Ravjiani",
    "Arijit Singh",
    "Sidhu Moose Wala",
    "Hariharan",
    "Pritam",
    "Mohit Chauhan",
    "Raftaar",
  ];

  async function getTheArtist() {
    try {
      const storedData = localStorage.getItem("artistData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        const filteredItems = parsedData.artistData.filter((item) =>
          singersToFilter.some((name) =>
            item.name.toLowerCase().includes(name.toLowerCase())
          )
        );
        // setArtist(filteredItems);

        setArtist(filteredItems);
      } else {
        const baseUrlArtist =
          "https://academics.newtonschool.co/api/v1/music/artist?limit=100";
        const response = await fetch(baseUrlArtist, {
          method: "GET",
          headers: {
            projectId: "8jf3b15onzua",
          },
        });
        const data = await response.json();
        const artistDataSet = data.data;

        // const actorToFilter =[];
        const filteredItems = artistDataSet.filter((item) =>
          singersToFilter.includes(item.name)
        );
        setArtist(filteredItems);

        localStorage.setItem(
          "artistData",
          JSON.stringify({
            artistData: artistDataSet,
          })
        );
      }
    } catch (error) {
      console.error("Something went Wrong");
    }
  }

  async function getThedataAlbum() {
    try {
      const storedData = localStorage.getItem("albumData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setAlbum(parsedData.albumData);
      } else {
        const baseUrlAlbum =
          "https://academics.newtonschool.co/api/v1/music/album?limit=100";
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
    getTheArtist();
    setSearchItem("");

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
          margin: "0 1rem 0 1rem", //new
        }}>
        <Typography
          sx={{ fontWeight: "700", fontSize: "22px", paddingTop: "10px" }}
          variant="h4">
          Popular Album
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "18rem", //new
            justifyContent: "space-between",
          }}>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexAlbum}
            sx={{
              background: "transparent",
              marginBottom: "10px",
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
          <Link to="/seeall">
            <button
              onClick={() => handleData(albumData, "Popular Album")}
              className="spb "
              style={{
                fontSize: "0.8rem",
                height: "33px",
                marginTop: "8px",
                overflow: "hidden",
              }}>
              SEE ALL
            </button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          marginTop: "1rem",
        }}>
        {albumData?.length > 0 &&
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
          margin: "0rem 1rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Romantic Songs
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "18rem",
            justifyContent: "space-between",
          }}>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexRomantic}
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
          <Link to="/seeall">
            <button
              onClick={() => handleData(romanticData, "Romantic Songs")}
              className="spb "
              style={{
                fontSize: "0.8rem",
                height: "33px",
                marginTop: "8px",
                overflow: "hidden",
              }}>
              SEE ALL
            </button>
          </Link>
        </div>
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
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0rem 1rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Happy Songs
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            minWidth: "18rem",
            justifyContent: "space-between",
          }}>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexHappy}
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
          <Link to="/seeall">
            <button
              onClick={() => handleData(happyData, "Happy Songs")}
              className="spb "
              style={{
                fontSize: "0.8rem",
                height: "33px",
                marginTop: "8px",
                overflow: "hidden",
              }}>
              SEE ALL
            </button>
          </Link>
        </div>
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
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0 1rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Artists
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "18rem",
            justifyContent: "space-between",
          }}>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexArtist}
            style={{
              background: "transparent",
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNextA}
                disabled={currentDataIndexArtist === 15}
                style={{
                  color: currentDataIndexArtist === 15 ? "grey" : "white",
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
                onClick={handleBackA}
                disabled={currentDataIndexArtist === 0}
                style={{
                  color: currentDataIndexArtist === 0 ? "grey" : "white",
                }}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
          <Link to="/seeall">
            <button
              onClick={() => handleData(artistData, "Artists")}
              className="spb "
              style={{
                fontSize: "0.8rem",
                height: "33px",
                marginTop: "8px",
                overflow: "hidden",
              }}>
              SEE ALL
            </button>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          marginTop: "1rem",
        }}>
        {artistData.length > 0 &&
          artistData
            .slice(currentDataIndexArtist, currentDataIndexArtist + 10)
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

                    <Link to="/artist" state={{ data: data }}>
                      <CardMedia
                        component="img"
                        image={data?.image}
                        alt={data?.name}
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
                      <Link to="/artist" state={{ data: data }}>
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
                      {data.name}
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
          margin: "0rem 1rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Excited Songs
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "18rem",
            justifyContent: "space-between",
          }}>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexExcited}
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
          <Link to="/seeall">
            <button
              onClick={() => handleData(excitedData, "Excited Songs")}
              className="spb "
              style={{
                fontSize: "0.8rem",
                height: "33px",
                marginTop: "8px",
                overflow: "hidden",
              }}>
              SEE ALL
            </button>
          </Link>
        </div>
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
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0rem 1rem 0 1rem",
        }}>
        <Typography sx={{ fontWeight: "700", fontSize: "22px" }} variant="h4">
          Sad Songs
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "18rem",
            justifyContent: "space-between",
          }}>
          <MobileStepper
            variant="d"
            steps={6}
            position="static"
            activeStep={currentDataIndexSad}
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
          <Link to="/seeall">
            <button
              onClick={() => handleData(sadData, "Sad Songs")}
              className="spb "
              style={{
                fontSize: "0.8rem",
                height: "33px",
                marginTop: "8px",
                overflow: "hidden",
              }}>
              SEE ALL
            </button>
          </Link>
        </div>
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
                updateSongPlayCallback={updateSongPlayCallback}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
