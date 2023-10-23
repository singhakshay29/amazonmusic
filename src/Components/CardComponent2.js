import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { HiChevronRight } from "react-icons/hi";
import DataContext from "../DataContext";

export default function CardComponent2({ data, minWidth }) {
  const { handleMouseEnter, handleMouseLeave, hoverStates } =
    useContext(DataContext);
  const [name] = useState(data?.name);

  const imageCard = (
    <React.Fragment>
      <div className="overlay"></div>
      <CardMedia
        component="img"
        image={data?.image}
        alt={data?.name}
        style={{
          borderRadius: "8px",
          height: "160px",
          width: "160px",
        }}
        onMouseOver={() => handleMouseEnter(data?._id)}
        onMouseLeave={() => handleMouseLeave(data?._id)}
      />
      {hoverStates[data?._id] && (
        <>
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
            onMouseEnter={() => handleMouseEnter(data?._id)}
            onMouseLeave={() => handleMouseLeave(data?._id)}>
            <HiChevronRight
              style={{
                fontSize: "2.5rem",
                transition: "font-size 0.2s",
              }}
            />
          </Button>
        </>
      )}
    </React.Fragment>
  );

  return (
    <>
      {minWidth ? (
        <>
          <Card
            className="container"
            key={data._id}
            sx={{
              maxWidth: 166,
              margin: "8px 20px",
              backgroundColor: "black",
            }}>
            <CardActionArea>
              {name ? (
                <>
                  <Link to="/artist" state={{ data: data }}>
                    {imageCard}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/playlist" state={{ data: data }}>
                    {imageCard}
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
                  {data?.title}
                </Typography>
                {name ? (
                  <>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}>
                      {data?.name}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="body2"
                      color="rgba(255, 255, 255, 0.6)">
                      {data.artists[0].name}
                    </Typography>
                  </>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      ) : (
        <>
          <Card
            className="container"
            key={data._id}
            sx={{
              minWidth: 166,
              margin: "8px 20px",
              backgroundColor: "black",
            }}>
            <CardActionArea>
              {name ? (
                <>
                  <Link to="/artist" state={{ data: data }}>
                    {imageCard}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/playlist" state={{ data: data }}>
                    {imageCard}
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
                  {data?.title}
                </Typography>
                {name ? (
                  <>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}>
                      {data?.name}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="body2"
                      color="rgba(255, 255, 255, 0.6)">
                      {data.artists[0].name}
                    </Typography>
                  </>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      )}
    </>
  );
}
