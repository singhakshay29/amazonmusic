import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PauseIcon from "@mui/icons-material/Pause";

export default function CardComponent({
  album,
  handleMouseEnter,
  handleMouseLeave,
  hoverStates,
  updateSongPlayCallback,
  togglePlayPause,
  isPlaying,
}) {
  return (
    <>
      <Card
        className="container"
        key={album._id}
        sx={{ minWidth: 190, margin: "10px 20px" }}>
        <CardActionArea>
          <div className="overlay"></div>
          <CardMedia
            component="img"
            height="200"
            image={album.thumbnail}
            alt={album.title}
            onMouseOver={() => handleMouseEnter(album._id)}
            onMouseLeave={() => handleMouseLeave(album._id)}></CardMedia>
          {hoverStates[album._id] && (
            <>
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
                }}
                onMouseEnter={() => handleMouseEnter(album._id)}
                onMouseLeave={() => handleMouseLeave(album._id)}
                onClick={() => {
                  updateSongPlayCallback(album._id);
                  togglePlayPause(!isPlaying);
                }}>
                {isPlaying[album._id] ? (
                  <PauseIcon style={{ fontSize: "2.5rem" }} />
                ) : (
                  <PlayArrowIcon style={{ fontSize: "2.5rem" }} />
                )}
              </Button>
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
                onMouseEnter={() => handleMouseEnter(album._id)}
                onMouseLeave={() => handleMouseLeave(album._id)}>
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
                onMouseEnter={() => handleMouseEnter(album._id)}
                onMouseLeave={() => handleMouseLeave(album._id)}>
                <MoreHorizIcon />
              </Button>
            </>
          )}
          <CardContent
            style={{
              height: "100px",
              width: "12em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              background: "black",
              color: "white",
            }}>
            <Typography gutterBottom variant="h6" component="div">
              {album.title}
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
              {album.artist[0]?.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
