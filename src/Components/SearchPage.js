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
      <Link to="/podcasts">
        <button className="spb">Podcasts</button>
      </Link>

      <Typography variant="h6" style={{ marginTop: "3rem", fontWeight: "600" }}>
        Moods & Activities
      </Typography>
      <Card style={{ marginTop: "3rem" }}>
        <Grid container spacing={1} sx={{ backgroundColor: "black" }}>
          <Link to="/pod">
            <Card
              style={{ backgroundImage: `url(${b1})`, backgroundSize: "cover" }}
              className="spC">
              Romantic
            </Card>
          </Link>
          <Card
            style={{ backgroundImage: `url(${b2})`, backgroundSize: "cover" }}
            className="spC">
            Happy
          </Card>
          <Card
            style={{ backgroundImage: `url(${b3})`, backgroundSize: "cover" }}
            className="spC">
            Excited
          </Card>
          <Card
            style={{ backgroundImage: `url(${b4})`, backgroundSize: "cover" }}
            className="spC">
            Sad
          </Card>
          <Card
            style={{ backgroundImage: `url(${b5})`, backgroundSize: "cover" }}
            className="spC">
            Party
          </Card>
          <Card
            style={{ backgroundImage: `url(${b6})`, backgroundSize: "cover" }}
            className="spC">
            Party
          </Card>
        </Grid>
      </Card>
    </Container>
  );
}
