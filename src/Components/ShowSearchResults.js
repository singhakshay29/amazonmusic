import {
  Box,
  Card,
  CardMedia,
  Container,
  Typography,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ShowSearchResults() {
  const location = useLocation();
  const { data } = location.state;

  return (
    <Container sx={{ mt: "6rem" }}>
      <Box sx={{ width: "100%", maxWidth: 150, m: "0.2rem 0.2rem" }}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "22px",
            paddingTop: "10px",
            textTransform: "capitalize",
            marginBottom: "1rem",
          }}>
          Top Results
        </Typography>
      </Box>
      <Card
        className="container"
        key={data?._id}
        sx={{
          maxWidth: 166,
          margin: "8px 20px",
          backgroundColor: "transparent",
        }}>
        <CardActionArea>
          <div className="overlay"></div>
          <Link to="/searchalbum" state={{ data: data }}>
            <CardMedia
              component="img"
              height="200"
              image={data?.thumbnail}
              alt={data?.title}
              style={{
                borderRadius: "8px",
                height: "160px",
                width: "169px",
              }}
            />
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{
                marginTop: "1rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                color: "white",
              }}>
              {data?.title}
            </Typography>
          </Link>
        </CardActionArea>
      </Card>
    </Container>
  );
}
