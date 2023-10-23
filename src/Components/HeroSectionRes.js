import React, { useContext, useEffect, useState } from "react";
import { Button, Typography, CardContent, CardActions } from "@mui/material";
import { BsFillPlayFill } from "react-icons/bs";
import AuthContext from "../AuthContex";
import DataContext from "../DataContext";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { MdRemoveCircleOutline } from "react-icons/md";

export default function HeroSectionRes({
  name,
  fav,
  data,
  updateSongPlayCallback,
}) {
  const { signSuccess } = useContext(AuthContext);
  const [playListData, setplayListData] = useState("");
  const { isPlaying, togglePlayPause, addandRemoveFavItem, favoritesId } =
    useContext(DataContext);

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
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold", textAlign: "center" }}
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
                fontWeight: "bold",
                color: "white",
                flexWrap: "wrap",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                boxSizing: "border-box",
                whiteSpace: "nowrap",
              }}
              component="div">
              {data?.title ? data.title : "Your Favorites"}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
              component="div">
              {data?.name}
            </Typography>
          </>
        )}

        {data?.description && (
          <Typography
            style={{ color: "white", textAlign: "center" }}
            variant="body2">
            {data?.description}
          </Typography>
        )}
      </CardContent>
      {fav ? (
        <>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
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
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
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
                  <AddIcon style={{ color: "white" }} />
                </Button>
              </Link>
            )}
          </CardActions>
        </>
      )}
    </React.Fragment>
  );
}
