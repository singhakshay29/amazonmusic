import React, { useContext } from "react";
import { List, Button, ListItem } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MdRemoveCircleOutline } from "react-icons/md";
import DataContext from "../DataContext";
import AuthContext from "../AuthContex";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function ListsOfSongs({ songs, index, updateSongPlayCallback }) {
  const { isPlaying, togglePlayPause, addandRemoveFavItem, favoritesId } =
    useContext(DataContext);
  const { signSuccess } = useContext(AuthContext);
  const isAlbumInFavorites = (songId) => {
    return favoritesId.includes(songId);
  };
  return (
    <>
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
              src={songs?.thumbnail}
              alt={songs?.title}
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
            {songs?.title}
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
                updateSongPlayCallback(songs?._id);
                togglePlayPause(!isPlaying);
              }}>
              <PlayArrowIcon />
              Play
            </Button>
          </ListItem>
          <ListItem sx={{ minWidth: "30px" }}>
            {signSuccess ? (
              <>
                {songs?._id && isAlbumInFavorites(songs?._id) ? (
                  <>
                    <Button onClick={() => addandRemoveFavItem(songs?._id)}>
                      <MdRemoveCircleOutline
                        style={{
                          color: "white",
                          fontSize: "1.5rem",
                        }}
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => addandRemoveFavItem(songs?._id)}>
                      <AddIcon style={{ color: "white" }} />
                    </Button>
                  </>
                )}
              </>
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
    </>
  );
}
