import { Box, Container, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchComponents({ searchItem }) {
  const [searchResultsSongs, setSearchResultsSongs] = useState([]);
  const [searchResultsAlbum, setSearchResultsAlbum] = useState([]);
  const [searchArtist, setArtist] = useState([]);

  useEffect(() => {
    async function getTheDetails() {
      const storedAlbum = localStorage.getItem("albumData");
      const storedSongs = localStorage.getItem("musicData");
      const parsedDataSongs = JSON.parse(storedSongs);
      const parsedDataAlbum = JSON.parse(storedAlbum);

      const filteredResultsAlbum = parsedDataAlbum.albumData.filter((item) => {
        const filterArraysArtist = item.artists.filter((artistItem) => {
          return artistItem.name
            .toLowerCase()
            .includes(searchItem.toLowerCase());
        });
        return filterArraysArtist.length > 0;
      });
      setArtist(filteredResultsAlbum);
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
    // setSearchHistory((prevHistory) => {
    //   if (searchItem && !prevHistory.includes(searchItem.toLowerCase())) {
    //     return [...prevHistory, searchItem.toLowerCase()];
    //   }
    //   return prevHistory;
    // });
  }, [searchItem]);

  return (
    <Container sx={{ mt: "6rem" }}>
      {/* {searchHistory.length > 0 && (
        <div>
          <h3>Search History:</h3>
          <ul>
            {searchHistory.map((query, index) => (
              <li key={index}>{query}</li>
            ))}
          </ul>
        </div>
      )} */}
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
              <List
                className="listItem"
                style={{
                  margin: "0.8rem 0rem",
                  cursor: "pointer",
                  width: "100%",
                }}
                key={result._id}>
                <Link to="/showsearchresults" state={{ data: result }}>
                  {result.title}
                </Link>
              </List>
            ))}
            {searchResultsAlbum.map((result) => (
              <List
                className="listItem"
                style={{
                  margin: "0.8rem 0rem",
                  cursor: "pointer",
                  width: "100%",
                }}
                key={result._id}>
                <Link to={`/playlist/${result._id}`}>{result.title}</Link>
              </List>
            ))}
            {searchArtist.map((result) => (
              <List
                className="listItem"
                style={{
                  margin: "0.8rem 0rem",
                  cursor: "pointer",
                  width: "100%",
                }}
                key={result._id}>
                <Link to="/artist" state={{ data: result }}>
                  {result.artists[0]?.name}
                </Link>
              </List>
            ))}
          </>
        )}
      </ListItem>
    </Container>
  );
}
