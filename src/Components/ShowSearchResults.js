import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, List, ListItem, Typography } from "@mui/material";

export default function ShowSearchResults() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  return (
    <Container sx={{ mt: "6rem" }}>
      <Box sx={{ width: "100%", maxWidth: 150, m: "0.2rem 0.2rem" }}>
        <Typography style={{ fontSize: "24px", lineHeight: "88px" }}>
          Top Results
        </Typography>
      </Box>
    </Container>
  );
}
// const filterArtistName = artistItem.filter((artist) => {
//   return artist.name.toLowerCase().includes(searchItem.toLowerCase());
// });
