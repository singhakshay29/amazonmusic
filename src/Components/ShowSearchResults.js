import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Container,
  CardActionArea,
  Typography,
} from "@mui/material";

export default function ShowSearchResults({ hoverStates }) {
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
      <Card
        className="container"
        key={data._id}
        sx={{
          minWidth: 166,
          margin: "8px 20px",

          display: "flex",
        }}
        style={{ backgroundColor: "black" }}>
        <CardActionArea>
          <div className="overlay"></div>
          <Link to="/searchalbum" state={{ data: data }}>
            <CardMedia
              component="img"
              height="200"
              image={data.thumbnail}
              alt={data.title}
              style={{
                borderRadius: "8px",
                height: "160px",
                width: "160px",
              }}
            />
          </Link>
          <Typography
            style={{ fontSize: "24px", lineHeight: "88px", color: "white" }}>
            {data.title}
          </Typography>
        </CardActionArea>
      </Card>
    </Container>
  );
}
