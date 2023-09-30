import {
  List,
  ListItem,
  Button,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BsFillPlayFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Artist({
  isPlaying,
  signSuccess,
  handleShowNav,
  setSearchItem,
  togglePlayPause,
  handleNotShowSearch,
  updateSongPlayCallback,
}) {
  const location = useLocation();
  const { data } = location.state;
  const [artist, setArtist] = useState({});
  const [, setLoader] = useState(true);
  const [playlistsongs, setplaylistsongs] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  const baseUrl = `https://academics.newtonschool.co/api/v1/music/artist/${data.artists[0]?._id}`;

  async function getTheDeatails() {
    const response = await fetch(baseUrl, {
      headers: {
        projectId: "8jf3b15onzua",
      },
    });
    const artistDetails = await response.json();
    setArtist(artistDetails.data);
    const songsArray = artistDetails.data.songs;
    setplaylistsongs(songsArray);
    setLoader(false);
  }
  const baseUrlSong =
    "https://academics.newtonschool.co/api/v1/music/favorites/like";
  async function addandRemoveFavItem(songId) {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);

      await fetch(baseUrlSong, {
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };
    const handleEffects = () => {
      handleNotShowSearch();
      setSearchItem("");
      handleShowNav();
      getTheDeatails();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleEffects();
    };
    // eslint-disable-next-line
  }, []);

  const cardResponsive = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold", textAlign: "center" }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Artist
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
          component="div">
          {artist.name}
        </Typography>

        <Typography
          style={{ color: "white", textAlign: "center" }}
          variant="body2">
          {artist.description}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            background: "rgb(37, 209, 218)",
            borderRadius: "20px",
            width: "80px",
            color: "black",
          }}
          onClick={() => {
            updateSongPlayCallback(artist.songs[0]?._id);
            togglePlayPause(!isPlaying);
          }}>
          <PlayArrowIcon />
          Play
        </Button>
        {signSuccess ? (
          <Button onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
            <AddIcon style={{ color: "white" }} />
          </Button>
        ) : (
          <Link to="/notsignin">
            <Button>
              <AddIcon style={{ color: "white" }} />
            </Button>
          </Link>
        )}
      </CardActions>
    </React.Fragment>
  );

  const card = (
    <React.Fragment>
      <div
        style={{
          marginLeft: "25rem",
          maxWidth: "60%",
          height: "10px",
        }}>
        <Typography
          sx={{
            fontWeight: "900",
            fontSize: "1rem",
            padding: 0,
          }}
          color="rgb(37, 209, 218)"
          textTransform={"uppercase"}
          gutterBottom>
          Artist
        </Typography>
        <Typography
          variant="h4"
          sx={{
            // maxWidth: "20rem",
            color: "white",
            fontFamily: "Gabarito",
            fontSize: "5rem",
            overflow: "hidden",
            maxHeight: "19rem",
          }}
          className="font"
          component="div">
          {artist.name}
        </Typography>
        <Typography
          sx={{
            marginTop: "2rem",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}>
          {artist.description}
        </Typography>
        <CardActions>
          <button
            className="spbplay"
            onClick={() => {
              updateSongPlayCallback(artist.songs[0]?._id);
              togglePlayPause(!isPlaying);
            }}>
            <BsFillPlayFill style={{ fontSize: "1.5rem" }} />
            Play
          </button>
          {signSuccess ? (
            <Button onClick={() => addandRemoveFavItem(artist.songs[0]?._id)}>
              <AddIcon style={{ color: "white", marginBottom: "10px" }} />
            </Button>
          ) : (
            <Link to="/notsignin">
              <Button>
                <AddIcon
                  style={{
                    color: "white",
                    marginBottom: "10px",
                    "&:hover": {
                      backgroundColor: "#a8edf0",
                    },
                  }}
                />
              </Button>
            </Link>
          )}
        </CardActions>
      </div>
    </React.Fragment>
  );
  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              backgroundImage: `url(${artist.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: "100%",
              height: "750px",
              filter: "blur(10px)",
              marginTop: "-7rem",
            }}></div>
          <div className="pI">
            <img src={artist.image} className="image" alt={artist.title} />
            <div className="iD">{cardResponsive}</div>
          </div>

          <div
            style={{
              marginTop: "10rem",
              width: "100%",
              marginBottom: "10rem",
            }}>
            {playlistsongs.length > 0 &&
              playlistsongs.map((songs, index) => (
                <List key={index} className="listDisplay">
                  <List className="sL">
                    <ListItem
                      sx={{
                        minWidth: "20px",
                        fontSize: "17px",
                        color: "gray",
                        paddingX: "15px",
                      }}>
                      {index + 1}
                    </ListItem>
                    <div style={{ minWidth: "74px", padding: "0" }}>
                      <img
                        src={songs.thumbnail}
                        alt={songs.title}
                        className="imageList"
                      />
                    </div>
                    <ListItem
                      sx={{
                        minWidth: "90px",
                        display: "flex",
                        paddingLeft: "10px",
                        overflow: "hidden",
                        fontSize: "15px",
                        boxSizing: "border-box",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {songs.title}
                    </ListItem>
                  </List>
                  <List className="sL">
                    <ListItem sx={{ minWidth: "50px" }}>
                      <Button
                        sx={{
                          borderRadius: "20px",
                          color: "white",
                        }}
                        onClick={() => {
                          updateSongPlayCallback(songs._id);
                          togglePlayPause(!isPlaying);
                        }}>
                        <PlayArrowIcon />
                        Play
                      </Button>
                    </ListItem>
                    <ListItem sx={{ minWidth: "30px" }}>
                      {signSuccess ? (
                        <Button onClick={() => addandRemoveFavItem(songs._id)}>
                          <AddIcon style={{ color: "white" }} />
                        </Button>
                      ) : (
                        <Link to="/notsignin">
                          <Button
                            sx={{
                              borderRadius: "20px",
                              color: "white",
                            }}>
                            <AddIcon style={{ color: "white" }} />
                          </Button>
                        </Link>
                      )}
                    </ListItem>
                  </List>
                </List>
              ))}
          </div>
        </>
      ) : (
        // <>
        //   <div
        //     style={{
        //       backgroundImage: `url(${artist.image})`,
        //       height: "100vh",
        //       filter: "blur(6px)",
        //       backgroundRepeat: "no-repeat",
        //     }}></div>
        //   <div
        //     style={{
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //       position: "absolute",
        //       margin: 0,
        //     }}>
        //     <Card
        //       sx={{
        //         width: 285,
        //         height: 285,
        //         m: "2rem",
        //         backgroundColor: "transparent",
        //       }}>
        //       <CardMedia
        //         component="img"
        //         image={artist.image}
        //         alt={artist.title}
        //         style={{
        //           position: "absolute",
        //           top: -550,
        //           left: 70,
        //           borderRadius: "20px",
        //         }}
        //       />
        //       <Card
        //         style={{
        //           fontFamily:
        //             "Sharp Grotesk Bold 20, Helvetica, Arial, sans-serif",
        //           backgroundColor: "transparent",
        //           position: "absolute",
        //           top: -180,
        //           left: 90,
        //           width: "300px",
        //           textAlign: "center",
        //           boxShadow: "none",
        //         }}>
        //         {cardResponsive}
        //       </Card>
        //     </Card>
        //   </div>
        //   <div style={{ marginTop: "10rem" }}>
        //     {playlistsongs.length > 0 &&
        //       playlistsongs.map((songs, index) => (
        //         <div
        //           key={index}
        //           style={{
        //             height: "15vh",
        //             backgroundColor: "rgba(0,0,0, 0.4)",
        //             display: "flex",
        //             flexDirection: "row",
        //             borderBottom: "2px solid grey",
        //             margin: "1rem 0",
        //           }}>
        //           <Typography
        //             style={{
        //               width: "50px",
        //               fontSize: "20px",
        //               color: "gray",
        //               margin: "2rem 1rem",
        //             }}>
        //             {index + 1}
        //           </Typography>
        //           <CardMedia
        //             component="img"
        //             image={songs.thumbnail}
        //             alt={songs.title}
        //             style={{ width: "200px" }}
        //           />
        //           <Box
        //             style={{
        //               color: "white",
        //               paddingLeft: "10px",
        //               width: "50%",
        //             }}>
        //             <Typography>{songs.title}</Typography>
        //             <Typography>{songs.mood.toUpperCase()}</Typography>
        //           </Box>
        //           <Box style={{ width: "500px" }}>
        //             <Button
        //               sx={{
        //                 borderRadius: "20px",
        //                 color: "white",

        //                 marginTop: "25px",
        //                 marginLeft: "20px",
        //               }}
        //               onClick={() => {
        //                 updateSongPlayCallback(songs._id);
        //                 togglePlayPause(!isPlaying);
        //               }}>
        //               <PlayArrowIcon />
        //               Play
        //             </Button>
        //             {signSuccess ? (
        //               <Button onClick={() => addandRemoveFavItem(songs._id)}>
        //                 <AddIcon style={{ color: "white" }} />
        //               </Button>
        //             ) : (
        //               <Link to="/notsignin">
        //                 <Button
        //                   sx={{
        //                     borderRadius: "20px",
        //                     color: "white",
        //                     marginTop: "25px",
        //                     marginLeft: "50px",
        //                   }}>
        //                   <AddIcon style={{ color: "white" }} />
        //                 </Button>
        //               </Link>
        //             )}
        //           </Box>
        //         </div>
        //       ))}
        //   </div>
        // </>
        <>
          <>
            <div
              style={{
                backgroundImage: `url(${artist.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "40rem",
                filter: "blur(10px)",
                marginTop: "1rem",
              }}></div>
            <img
              src={artist.image}
              alt={artist.title}
              className="pI imgP playlistMainI"
            />
            <div className="pI playlistMainI">
              <div
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  marginLeft: "2rem",
                }}>
                {card}
              </div>
            </div>
            <div>
              {playlistsongs.length > 0 &&
                playlistsongs.map((songs, index) => (
                  <List key={index} className="listDisplay">
                    <List className="sL">
                      <ListItem
                        sx={{
                          minWidth: "20px",
                          fontSize: "17px",
                          color: "gray",
                          paddingX: "15px",
                        }}>
                        {index + 1}
                      </ListItem>
                      <div style={{ minWidth: "74px", padding: "0" }}>
                        <img
                          src={songs.thumbnail}
                          alt={songs.title}
                          className="imageList"
                        />
                      </div>
                      <ListItem
                        sx={{
                          minWidth: "90px",
                          display: "flex",
                          paddingLeft: "10px",
                          overflow: "hidden",
                          fontSize: "15px",
                          boxSizing: "border-box",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                        {songs.title}
                      </ListItem>
                    </List>
                    <List className="sL">
                      <ListItem sx={{ minWidth: "50px" }}>
                        <Button
                          sx={{
                            borderRadius: "20px",
                            color: "white",
                          }}
                          onClick={() => {
                            updateSongPlayCallback(songs._id);
                            togglePlayPause(!isPlaying);
                          }}>
                          <PlayArrowIcon />
                          Play
                        </Button>
                      </ListItem>
                      <ListItem sx={{ minWidth: "30px" }}>
                        {signSuccess ? (
                          <Button
                            onClick={() => addandRemoveFavItem(songs._id)}>
                            <AddIcon style={{ color: "white" }} />
                          </Button>
                        ) : (
                          <Link to="/notsignin">
                            <Button
                              sx={{
                                borderRadius: "20px",
                                color: "white",
                              }}>
                              <AddIcon style={{ color: "white" }} />
                            </Button>
                          </Link>
                        )}
                      </ListItem>
                    </List>
                  </List>
                ))}
            </div>
          </>
        </>
      )}
    </>
  );
}
