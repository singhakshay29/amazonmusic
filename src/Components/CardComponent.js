import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  IconButton,
  CardActionArea,
} from "@mui/material";
import AuthContext from "../AuthContex";
import { Link } from "react-router-dom";
import DataContext from "../DataContext";
import { MdRemove } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import { BsFillPlayFill } from "react-icons/bs";
import React, { useContext, useMemo } from "react";
export default function CardComponent({
  album,
  index,
  minWidth,
  updateSongPlayCallback,
}) {
  const { signSuccess } = useContext(AuthContext);
  const { favoritesId, addandRemoveFavItem } = useContext(DataContext);

  const {
    hoverStates,
    isPlaying,
    togglePlayPause,
    handleMouseEnter,
    handleMouseLeave,
  } = useContext(DataContext);

  const isAlbumInFavorites = useMemo(() => {
    return favoritesId.includes(album._id);
  }, [album._id, favoritesId]);

  const cardActionArea = (
    <>
      <CardActionArea>
        <div className="overlay"></div>
        <CardMedia
          component="img"
          image={album.thumbnail}
          alt={album.title}
          style={{
            borderRadius: "8px",
            height: "160px",
            width: "160px",
            cursor: "default",
          }}
          onMouseOver={() => handleMouseEnter(album._id)}
          onMouseLeave={() => handleMouseLeave(album._id)}></CardMedia>
        {hoverStates[album._id] && (
          <>
            <IconButton
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
                width: "65px",
                height: "65px",
                transition:
                  "width 0.2s ease ,height 0.2s ease,padding 0.2s ease",
                padding: "12px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  width: "70px",
                  height: "70px",
                  padding: "0px",
                },
              }}
              onMouseEnter={() => handleMouseEnter(album._id)}
              onMouseLeave={() => handleMouseLeave(album._id)}
              onClick={() => {
                updateSongPlayCallback(album._id);
                togglePlayPause(!isPlaying);
              }}>
              <>
                <BsFillPlayFill
                  style={{ fontSize: "2.5rem", marginLeft: "4px" }}
                />
              </>
            </IconButton>
            {signSuccess ? (
              <>
                {isAlbumInFavorites ? (
                  <>
                    <IconButton
                      variant="contained"
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: "30%",
                        left: "20%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        background: "transparent",
                        boxShadow: "none",
                        color: "white",
                        "&:hover": {
                          color: "rgb(37, 209, 218)",
                        },
                      }}
                      onMouseEnter={() => handleMouseEnter(album._id)}
                      onMouseLeave={() => handleMouseLeave(album._id)}
                      onClick={() => addandRemoveFavItem(album._id)}>
                      <MdRemove style={{ fontSize: "1.5rem" }} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      variant="contained"
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: "30%",
                        left: "20%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        background: "transparent",
                        boxShadow: "none",
                        color: "white",
                        "&:hover": {
                          color: "rgb(37, 209, 218)",
                        },
                      }}
                      onMouseEnter={() => handleMouseEnter(album._id)}
                      onMouseLeave={() => handleMouseLeave(album._id)}
                      onClick={() => addandRemoveFavItem(album._id)}>
                      <AddIcon />
                    </IconButton>
                  </>
                )}
              </>
            ) : (
              <Link to="/notsignin">
                <IconButton
                  variant="contained"
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    background: "transparent",
                    boxShadow: "none",
                    color: "white",
                    "&:hover": {
                      color: "rgb(37, 209, 218)",
                    },
                  }}
                  onMouseEnter={() => handleMouseEnter(album._id)}
                  onMouseLeave={() => handleMouseLeave(album._id)}>
                  <AddIcon style={{ fontSize: "1.5rem" }} />
                </IconButton>
              </Link>
            )}
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
            padding: "16px 8px",
          }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "9.8rem",
            }}>
            {album.title}
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
            {album.artist[0]?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </>
  );

  return (
    <>
      {minWidth ? (
        <>
          <Card
            className="container"
            key={index}
            sx={{
              maxWidth: 166,
              margin: "8px 20px",
              backgroundColor: "black",
            }}>
            {cardActionArea}
          </Card>
        </>
      ) : (
        <>
          <Card
            className="container"
            key={index}
            sx={{
              minWidth: 166,
              margin: "8px 20px",
              backgroundColor: "black",
            }}>
            {cardActionArea}
          </Card>
        </>
      )}
    </>
  );
}
