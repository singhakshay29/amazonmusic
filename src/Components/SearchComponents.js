import { Box, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";

export default function SearchComponents({ searchItem }) {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const query = queryParams.get("query");
  const [searchResults, setSearchResults] = useState([]);
  //const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    async function getTheDetails() {
      //const storedAlbum = localStorage.getItem("albumData");
      const storedSongs = localStorage.getItem("musicData");
      const parsedDataSongs = JSON.parse(storedSongs);
      //const parsedDataAlbum = JSON.parse(storedAlbum);
      console.log(parsedDataSongs);
      //console.log(parsedDataAlbum);
      //   const filteredResults = parsedDataAlbum.albumData.filter((item) => {
      //     const filterArraysArtist = item.artists.filter((artistItem) => {
      //       return artistItem.name
      //         .toLowerCase()
      //         .includes(searchItem.toLowerCase());
      //     });
      //     // console.log(filterArraysArtist);
      //     return filterArraysArtist.length > 0;
      //   });
      const filteredResultsSongs = parsedDataSongs.musicData.filter((item) => {
        return item.title.toLowerCase().includes(searchItem.toLowerCase());
      });

      console.log(filteredResultsSongs);
      //   console.log(filteredResults);
      setSearchResults(filteredResultsSongs);
      console.log(searchItem);
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
    <div>
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
      <Box sx={{ width: "100%", maxWidth: 150, m: "1rem 2rem" }}>
        <Typography style={{ fontSize: "24px", lineHeight: "88px" }}>
          Suggestions
        </Typography>
      </Box>

      <ul>
        {searchResults.map((result, index) => (
          <List style={{ margin: "1rem 2rem" }} key={index}>
            {/* {result.artists} */}
            {/* {result.artist} */}
            {result.title}
          </List>
        ))}
      </ul>
    </div>
  );
}
