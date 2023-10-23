import { Box, Button, Card } from "@mui/material";
import { Link } from "react-router-dom";
import comingsoon from "../assests/comingsoon.jpg";

export default function ComingSoon() {
  return (
    <>
      <div className="cd1">
        <div className="cd2">
          <Card
            style={{
              backgroundColor: "transparent",
              color: "white",
              letterSpacing: "2px",
              marginTop: -26,
              padding: 0,
            }}>
            <img src={comingsoon} alt="comingsoon" className="cimg" />
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
