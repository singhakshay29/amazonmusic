import { Box, Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import comingsoon from "../assests/comingsoon.jpg";

export default function ComingSoon() {
  return (
    <>
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>
        <div
          style={{
            backgroundColor: "rgba(41, 37, 45, 0.6)",
            height: "400px",
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}>
          <Card
            style={{
              backgroundColor: "transparent",
              color: "white",
              letterSpacing: "2px",
              marginTop: -26,
              padding: 0,
            }}>
            <img
              src={comingsoon}
              alt="comingsoon"
              style={{
                width: "450px",
                height: "250px",
              }}
            />
          </Card>
          <Box
            sx={{
              color: "white",
              margin: "2rem",
            }}>
            This feature is currently unavailable
          </Box>
          <Link to="/">
            <Button sx={{ color: "rgb(37, 209, 218)" }}>Back To Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
