import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  CardActionArea,
} from "@mui/material";
import React, {
  useContext,
  useState,
  useEffect,
  //  useMemo
} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import AuthContext from "../AuthContex";
import CardComponent from "./CardComponent";
// import { BsFillPlayFill } from "react-icons/bs";
// import { MdRemove } from "react-icons/md";
// import AddIcon from "@mui/icons-material/Add";

export default function SeeAll({ updateSongPlayCallback }) {
  const {
    seeAllData,
    handleMouseEnter,
    handleMouseLeave,
    hoverStates,
    heading,
    // togglePlayPause,
    // signSuccess,
    // isPlaying,
    // id,
    // setId,
  } = useContext(AuthContext);
  const [songsData, setSongsData] = useState(null);
  const [albumData, setAlbumData] = useState(null);
  const [artistData, setartistData] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(20);
  const [itemsToLoad] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const renderedItems = seeAllData?.slice(1, displayedItems);
  const [loader, setloader] = useState(false);
  // const [album, setAlbum] = useState(null);

  // async function addandRemoveFavItem(songId) {
  //   const user = localStorage.getItem("signupDeatils");
  //   if (user) {
  //     const parsedData = JSON.parse(user);
  //     const baseUrlSong =
  //       "https://academics.newtonschool.co/api/v1/music/favorites/like";

  //     await fetch(baseUrlSong, {
  //       method: "PATCH",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${parsedData.signup.token}`,
  //         projectId: "8jf3b15onzua",
  //       },
  //       body: JSON.stringify({ songId: songId }),
  //     });
  //   }
  // }
  // const isAlbumInFavorites = useMemo(() => {
  //   return id.includes(album?._id);
  // }, [album?._id, id]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      displayedItems < totalItems
    ) {
      setDisplayedItems((prevCount) => prevCount + itemsToLoad);
      // Load more item
      setTimeout(() => {
        setloader(false);
      }, 100);
    }
  };
  // const baseUrlSong =
  //   "https://academics.newtonschool.co/api/v1/music/favorites/like";
  useEffect(() => {
    // async function getTheFavList() {
    //   try {
    //     const user = localStorage.getItem("signupDeatils");
    //     if (user) {
    //       const parsedData = JSON.parse(user);
    //       const response = await fetch(baseUrlSong, {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${parsedData.signup.token}`,
    //           projectId: "8jf3b15onzua",
    //         },
    //       });
    //       if (!response.ok) {
    //         throw new Error(`HTTP Error! Status: ${response.status}`);
    //       }
    //       const data = await response.json();
    //       const newIdArray = data.data?.songs.map((item) => item._id);
    //       setId(newIdArray);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // }
    // getTheFavList();

    setTotalItems(seeAllData?.length);
    const handleCheckData = () => {
      if (heading === "Popular Album") {
        setAlbumData(seeAllData);
      } else if (heading === "Artists") {
        setartistData(seeAllData);
      } else {
        setSongsData(seeAllData);
        // setAlbum(seeAllData);
      }
      setTotalItems(seeAllData?.length);
    };
    handleCheckData();
    document.addEventListener("scroll", handleScroll);
    return () => {
      // Remove the scroll event listener when the component unmounts
      document.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {seeAllData?.length > 0 && (
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
            <Typography
              sx={{ fontWeight: "700", fontSize: "22px", paddingTop: "10px" }}
              variant="h4">
              {heading}
            </Typography>
          </div>
          <Card
            style={{
              marginTop: "3rem",
              marginBottom: "5rem",
            }}>
            <Grid
              spacing={1}
              sx={{
                backgroundColor: "black",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}>
              {albumData?.length > 0 && (
                <>
                  {renderedItems?.length > 0 &&
                    renderedItems.map((data) => (
                      <Card
                        className="container"
                        key={data._id}
                        sx={{
                          maxWidth: 166,
                          margin: "8px 20px",
                          backgroundColor: "black",
                        }}>
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
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.15)",
                                    boxShadow: "none",
                                    width: "55px",
                                    height: "60px",
                                    transition:
                                      "width 0.2s ease ,height 0.2s ease",

                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.3)",
                                      width: "65px",
                                      height: "63px",
                                    },
                                  }}
                                  onMouseEnter={() =>
                                    handleMouseEnter(data._id)
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(data._id)
                                  }>
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
                              width: "10rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              color: "white",
                              padding: "16px 8px",
                              marginLeft: "5px",
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
                </>
              )}

              {artistData?.length > 0 && (
                <>
                  {renderedItems?.length > 0 &&
                    renderedItems.map((data) => (
                      <Card
                        className="container"
                        key={data.id}
                        sx={{
                          maxWidth: 166,
                          margin: "8px 20px",
                          backgroundColor: "black",
                        }}>
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
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.15)",
                                    boxShadow: "none",
                                    width: "55px",
                                    height: "60px",
                                    transition:
                                      "width 0.2s ease ,height 0.2s ease",

                                    "&:hover": {
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.3)",
                                      width: "65px",
                                      height: "63px",
                                    },
                                  }}
                                  onMouseEnter={() =>
                                    handleMouseEnter(data._id)
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(data._id)
                                  }>
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
                </>
              )}
              {songsData?.length > 0 && (
                <>
                  {renderedItems?.length > 0 &&
                    renderedItems.map((album, index) => (
                      <CardComponent
                        album={album}
                        index={index}
                        updateSongPlayCallback={updateSongPlayCallback}
                        minWidth="10"
                      />
                    ))}
                </>
              )}

              {loader ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "5rem",
                      marginTop: "3rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <CircularProgress sx={{ color: "rgb(37, 209, 218)" }} />
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Card>
        </div>
      )}
    </>
  );
}
// <Card
//   style={{
//     padding: "0",
//     margin: "6rem 0 0 1rem",
//     display: "flex",
//     flexWrap: "wrap",
//     flexDirection: "column",
//     border: "2px solid green",
//     maxWidth: "77.5rem",
//   }}>
//   <Grid
//     spacing={1}
//     sx={{
//       backgroundColor: "orange",
//       alignItems: "center",
//       display: "flex",
//       justifyContent: "center",
//       flexWrap: "wrap",
//     }}>
//     {songsData?.length > 0 && (
//       <>
//         {renderedItems?.length > 0 &&
//           renderedItems.map((album, index) => (
//             <CardComponent
//               album={album}
//               index={index}
//               updateSongPlayCallback={updateSongPlayCallback}
//             />
//           ))}
//       </>
//     )}
//   </Grid>
//   {/* <div
//     style={{
//       display: "grid",
//       border: "1px solid blue",
//       gridTemplateColumns: "repeat(6,1fr)",
//       justifyContent: "space-between",
//       margin: "0 1rem 0 1rem",
//     }}> */}
// </Card>
