// src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import Button from "@mui/material/Button";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ListItem, List } from "@mui/material";

const Home = ({
  updateSongPlayCallback,
  togglePlayPause,
  handleMouseEnter,
  handleMouseLeave,
  isPlaying,
  hoverStates,
}) => {
  const [romanticData, setromanticData] = useState([]);
  const [happyData, setHappyData] = useState([]);
  const [excitedData, setExcitedData] = useState([]);
  const [sadData, setsadData] = useState([]);
  const [albumData, setAlbum] = useState([]);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

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
          "https://academics.newtonschool.co/api/v1/music/song";
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

  const baseUrlAlbum = "https://academics.newtonschool.co/api/v1/music/album";
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
      <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
        Popular Albums
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem",
        }}>
        {albumData.length > 0 &&
          albumData.map((data) => (
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
                    {/* <Button
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
                      }}
                      onMouseEnter={() => handleMouseEnter(data._id)}
                      onMouseLeave={() => handleMouseLeave(data._id)}
                      onClick={() => {
                        updateSongPlayCallback(data._id);
                        togglePlayPause(!isPlaying);
                      }}>
                      {isPlaying[data._id] ? (
                        <PauseIcon style={{ fontSize: "2.5rem" }} />
                      ) : (
                        <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
                      )}
                    </Button> */}
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
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        position: "absolute",
                        top: "35%",
                        left: "80%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        background: "transparent",
                        border: "none",
                      }}
                      onClick={toggleDropDown}
                      onMouseEnter={() => {
                        handleMouseEnter(data._id);
                        setIsDropDownOpen(true);
                      }}
                      onMouseLeave={() => {
                        handleMouseLeave(data._id);
                        setIsDropDownOpen(false);
                      }}>
                      <MoreHorizIcon />
                      {isDropdownOpen && (
                        <Card
                          sx={{
                            mt: "3rem",
                            position: "absolute",
                            left: 15,
                            zIndex: 10,
                          }}>
                          <List
                            style={{
                              position: "fixed",
                              border: "0.5px solid grey",
                              width: "280px",
                              borderRadius: "10px",
                              backgroundColor: "rgba(15,17,17,.7)",
                              backdropFilter: "blur(30px)",
                            }}
                            onMouseEnter={() => setIsDropDownOpen(true)}>
                            <Link
                              to="/favorites"
                              style={{
                                color: "white",
                              }}
                              onClick={toggleDropDown}>
                              <ListItem
                                onMouseEnter={() => setIsDropDownOpen(true)}>
                                Add to Favorites
                              </ListItem>
                            </Link>
                          </List>
                        </Card>
                      )}
                    </Button>
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
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
                    {data.artists[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
        Featured Romantic Songs
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {romanticData.length > 0 &&
          romanticData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
          ))}
      </div>
      <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
        Happy Songs
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {happyData.length > 0 &&
          happyData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
          ))}
      </div>
      <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "30px" }}>
        Excited Songs
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {excitedData.length > 0 &&
          excitedData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
          ))}
      </div>
      <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "30px" }}>
        Sad Songs
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          marginTop: "1rem", // Enable horizontal scrolling
        }}>
        {sadData.length > 0 &&
          sadData.map((album, index) => (
            <CardComponent
              album={album}
              index={index}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hoverStates={hoverStates}
              updateSongPlayCallback={updateSongPlayCallback}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying} // Pass isPlaying as a prop
            />
          ))}
      </div>
    </Container>
  );
};

export default Home;
