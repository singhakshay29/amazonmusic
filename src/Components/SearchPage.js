import { Card, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import b1 from "../assests/b1.jpeg";
import b2 from "../assests/b2.jpeg";
import b3 from "../assests/b3.jpeg";
import b4 from "../assests/b4.jpeg";
import b5 from "../assests/b5.jpeg";
import b6 from "../assests/b6.jpg";

export default function SearchPage() {
  return (
    <Container sx={{ mt: "7rem" }}>
      <Link to="/pod">
        <button className="spb">Podcasts</button>
      </Link>

      <Typography variant="h6" style={{ marginTop: "3rem", fontWeight: "600" }}>
        Moods & Activities
      </Typography>
      <Card
        style={{
          marginTop: "3rem",
          marginBottom: "5rem",
        }}>
        <Grid
          spacing={1}
          sx={{
            backgroundColor: "black",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
          <Link to="/pod?mood=romantic">
            <Card
              style={{
                backgroundImage: `url(${b1})`,
                backgroundSize: "cover",
                color: "white",
              }}
              className="spC">
              Romantic
            </Card>
          </Link>
          <Link to="/pod?mood=happy">
            <Card
              style={{
                backgroundImage: `url(${b2})`,
                backgroundSize: "cover",
                color: "white",
              }}
              className="spC">
              Happy
            </Card>
          </Link>
          <Link to="/pod?mood=excited">
            <Card
              style={{
                backgroundImage: `url(${b3})`,
                backgroundSize: "cover",
                color: "white",
              }}
              className="spC">
              Excited
            </Card>
          </Link>
          <Link to="/pod?mood=sad">
            <Card
              style={{
                backgroundImage: `url(${b4})`,
                backgroundSize: "cover",
                color: "white",
              }}
              className="spC">
              Sad
            </Card>
          </Link>
          <Link to="/pod?mood=party">
            <Card
              style={{
                backgroundImage: `url(${b6})`,
                backgroundSize: "cover",
                color: "white",
              }}
              className="spC">
              Party
            </Card>
          </Link>
          <Link to="/pod?mood=chill">
            <Card
              style={{
                backgroundImage: `url(${b5})`,
                backgroundSize: "cover",
                color: "white",
              }}
              className="spC">
              Chill
            </Card>
          </Link>
        </Grid>
      </Card>
    </Container>
  );
}
