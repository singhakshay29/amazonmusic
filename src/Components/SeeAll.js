import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  CardActionArea,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import CardComponent from "./CardComponent";
import DataContext from "../DataContext";

export default function SeeAll({ updateSongPlayCallback }) {
  const {
    hoverStates,
    handleMouseEnter,
    handleMouseLeave,
    seeAllData,
    heading,
  } = useContext(DataContext);
  const [songsData, setSongsData] = useState(null);
  const [albumData, setAlbumData] = useState(null);
  const [artistData, setartistData] = useState(null);
  const renderedItems = seeAllData;

  useEffect(() => {
    const handleCheckData = () => {
      if (heading === "Popular Album") {
        setAlbumData(seeAllData);
      } else if (heading === "Artists") {
        setartistData(seeAllData);
      } else {
        setSongsData(seeAllData);
      }
    };
    handleCheckData();
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
            </Grid>
          </Card>
        </div>
      )}
    </>
  );
}
