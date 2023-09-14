import { Card } from "@mui/material";
import React from "react";
import { useEffect } from "react";
// import Stack from "@mui/material/Stack";
// import CircularProgress from "@mui/material/CircularProgress";

export default function Favorites() {
  const baseUrlSong =
    "https://academics.newtonschool.co/api/v1/music/favorites/like";
  async function addandRemoveFavItem(songId) {
    const response = await fetch(baseUrlSong, {
      method: "PATCH",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ1ZTJjODNiMTUwM2FmYThhOTJmMCIsImlhdCI6MTY5NDY3MzU5MCwiZXhwIjoxNzI2MjA5NTkwfQ.Y6u7TyCK-9qIhUEPRdpgYWGfyyt-XJtWCKPqEElDyV8",
        projectID: "8jf3b15onzua",
      },
      BODY: { songId: songId },
    });
    const data = await response.json();
  }

  async function getTheFavoritesList() {
    const response = await fetch(baseUrlSong, {
      method: "GET",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ1ZTJjODNiMTUwM2FmYThhOTJmMCIsImlhdCI6MTY5NDY3MzU5MCwiZXhwIjoxNzI2MjA5NTkwfQ.Y6u7TyCK-9qIhUEPRdpgYWGfyyt-XJtWCKPqEElDyV8",
        projectID: "8jf3b15onzua",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    //  addandRemoveFavItem();
    //getTheFavoritesList();
  }, []);
  return (
    <Card sx={{ mt: "7rem" }}>
      Favorites
      {/* <Card style={{ background: "black" }}>
        <Stack
          sx={{ color: "grey.500" }}
          spacing={3}
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </Stack>
      </Card> */}
    </Card>
  );
}
