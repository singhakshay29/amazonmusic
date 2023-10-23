import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Box, Container, List, ListItem, Typography } from "@mui/material";

export default function SearchComponents({ searchItem }) {
  const [searchArtist, setArtist] = useState([]);
  const [searchResultsSongs, setSearchResultsSongs] = useState([]);
  const [searchResultsAlbum, setSearchResultsAlbum] = useState([]);

  useEffect(() => {
    async function getTheDetails() {
      const storedArtist = localStorage.getItem("artistData");
      const storedAlbum = localStorage.getItem("albumData");
      const storedSongs = localStorage.getItem("musicData");
      const parsedDataSongs = JSON.parse(storedSongs);
      const parsedDataAlbum = JSON.parse(storedAlbum);
      const parsedDataArtist = JSON.parse(storedArtist);
      const filteredResultsArtist = parsedDataArtist.artistData.filter(
        (item) => {
          return item.name.toLowerCase().includes(searchItem.toLowerCase());
        }
      );
      setArtist(filteredResultsArtist);

      const filteredResultsAlbumByName = parsedDataAlbum.albumData.filter(
        (item) => {
          return item.title.toLowerCase().includes(searchItem.toLowerCase());
        }
      );
      const filteredResultsSongs = parsedDataSongs.musicData.filter((item) => {
        return item.title.toLowerCase().includes(searchItem.toLowerCase());
      });
      setSearchResultsAlbum(filteredResultsAlbumByName);
      setSearchResultsSongs(filteredResultsSongs);
    }
    if (searchItem) {
      getTheDetails();
    }
  }, [searchItem]);

  return (
    <Container sx={{ mt: "6rem" }}>
      <Box sx={{ width: "100%", maxWidth: 150, m: "0.2rem 0.2rem" }}>
        <Typography style={{ fontSize: "24px", lineHeight: "88px" }}>
          Suggestions
        </Typography>
      </Box>
      <ListItem
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}>
        {searchResultsSongs.length === 0 &&
        searchResultsAlbum.length === 0 &&
        searchArtist.length === 0 ? (
          <Typography>No results found</Typography>
        ) : (
          <>
            {searchResultsSongs.map((result) => (
              <Link to="/showsearchresults" state={{ data: result }}>
                <List
                  className="listItem"
                  style={{
                    margin: "0.8rem 0rem",
                    cursor: "pointer",
                    width: "90vw",
                  }}
                  key={result?._id}>
                  {result?.title}
                </List>
              </Link>
            ))}
            {searchResultsAlbum.map((result) => (
              <Link to="/playlist" state={{ data: result }}>
                <List
                  className="listItem"
                  style={{
                    margin: "0.8rem 0rem",
                    cursor: "pointer",
                    width: "90vw",
                  }}
                  key={result?._id}>
                  {result?.title}
                </List>
              </Link>
            ))}
            {searchArtist.map((result) => (
              <Link to="/artist" state={{ data: result }}>
                <List
                  className="listItem"
                  style={{
                    margin: "0.8rem 0rem",
                    cursor: "pointer",
                    width: "90vw",
                  }}
                  key={result?._id}>
                  {result?.name}
                </List>
              </Link>
            ))}
          </>
        )}
      </ListItem>
    </Container>
  );
}
