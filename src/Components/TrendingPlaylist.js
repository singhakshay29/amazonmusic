import { Container, Typography, Card, Grid } from "@mui/material";
import React from "react";
import { useContext } from "react";
import CardComponent from "./CardComponent";

import DataContext from "../DataContext";

export default function TrendingPlaylist({ updateSongPlayCallback }) {
  const { trendingSongs } = useContext(DataContext);

  return (
    <>
      <Container sx={{ mt: "7rem" }}>
        <Typography
          sx={{ fontWeight: "700", fontSize: "22px", paddingTop: "10px" }}
          variant="h4">
          Trending Playlists
        </Typography>
        <Card
          style={{
            marginTop: "3rem",
            marginBottom: "5rem",
            background: "transparent",
          }}>
          <Grid
            spacing={1}
            sx={{
              background: "transparent",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}>
            {trendingSongs?.length > 0 &&
              trendingSongs?.map((album, index) => (
                <>
                  <CardComponent
                    album={album}
                    index={index}
                    updateSongPlayCallback={updateSongPlayCallback}
                    minWidth="10"
                  />
                </>
              ))}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
