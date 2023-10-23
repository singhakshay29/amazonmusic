import { Link } from "react-router-dom";
import AuthContext from "../AuthContex";
import DataContext from "../DataContext";
import AddIcon from "@mui/icons-material/Add";
import { BsFillPlayFill } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { Button, Typography, CardActions } from "@mui/material";

export default function HeroSection({
  name,
  data,
  fav,
  updateSongPlayCallback,
}) {
  const { isPlaying, togglePlayPause, addandRemoveFavItem, favoritesId } =
    useContext(DataContext);
  const [playListData, setplayListData] = useState("");
  const { signSuccess } = useContext(AuthContext);
  const isAlbumInFavorites = (songId) => {
    return favoritesId.includes(songId);
  };

  useEffect(() => {
    function checkData() {
      if (name === "Playlist") {
        setplayListData(true);
      } else if (name === "Artist") {
        setplayListData(false);
      }
    }
    checkData();
    // eslint-disable-next-line
  }, []);
  return (
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
        {name}
      </Typography>
      {playListData ? (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontFamily: "Gabarito",
              fontSize: "5rem",
              overflow: "hidden",
              maxHeight: "19rem",
            }}
            className="font"
            component="div">
            {data?.title ? data?.title : "Your Favorites"}
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontFamily: "Gabarito",
              fontSize: "5rem",
              overflow: "hidden",
              maxHeight: "19rem",
            }}
            className="font"
            component="div">
            {data?.name}
          </Typography>
        </>
      )}

      {data?.description && (
        <Typography
          sx={{
            marginTop: "2rem",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}>
          {data?.description}
        </Typography>
      )}
      {fav ? (
        <>
          <CardActions sx={{ marginTop: "4rem" }}>
            <button
              className="spbplay"
              onClick={() => {
                updateSongPlayCallback(data?.[0]?._id);
                togglePlayPause(!isPlaying);
              }}>
              <BsFillPlayFill style={{ fontSize: "1.5rem" }} />
              Play
            </button>
          </CardActions>
        </>
      ) : (
        <>
          <CardActions>
            <button
              className="spbplay"
              onClick={() => {
                updateSongPlayCallback(data?.songs[0]?._id);
                togglePlayPause(!isPlaying);
              }}>
              <BsFillPlayFill style={{ fontSize: "1.5rem" }} />
              Play
            </button>
            {signSuccess ? (
              <>
                {data?.songs?.[0]?._id &&
                isAlbumInFavorites(data?.songs[0]?._id) ? (
                  <>
                    <Button
                      onClick={() => addandRemoveFavItem(data?.songs[0]?._id)}>
                      <MdRemoveCircleOutline
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => addandRemoveFavItem(data?.songs[0]?._id)}>
                      <AddIcon style={{ color: "white" }} />
                    </Button>
                  </>
                )}
              </>
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
        </>
      )}
    </div>
  );
}
