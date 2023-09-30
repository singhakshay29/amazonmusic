import React from "react";
import getbg from "../assests/getbg.png";
import { Button, Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export default function GetHelp() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${getbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "37rem",
          filter: "blur(10px)",
          marginTop: "5rem",
        }}></div>
      <div
        style={{
          backgroundColor: "rgba(15, 17, 17, 0.8)",
          width: "100%",
          height: "37rem",
          position: "absolute",
          marginTop: "5rem",
          top: 0,
        }}></div>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Container
          sx={{
            width: "400px",
            height: "50px",
            position: "absolute",
            top: 140,
            textAlign: "right",
          }}>
          <Link to="/">
            <Button
              sx={{
                backdropFilter: "blur(10px)",
                color: "white",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: "none",
                width: "55px",
                height: "60px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  width: "58px",
                  height: "61px",
                },
              }}>
              <CloseIcon />
            </Button>
          </Link>
        </Container>
        <Container
          sx={{
            width: "700px",
            height: "170px",
            position: "absolute",
            top: 200,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography sx={{ fontWeight: "900", fontSize: "30px" }}>
            Get Help
          </Typography>
          <Typography
            sx={{
              marginTop: "1rem",
              fontWeight: "900",
              fontSize: "25px",
            }}>
            Help with Amazon Music
          </Typography>
          <Typography
            sx={{
              marginTop: "1rem",
              fontWeight: "900",
              fontSize: "16px",
            }}>
            If you have a problem that requires assistance, please visit our
            FAQs or contact Customer Services .
          </Typography>
          <Typography
            sx={{
              color: "rgb(37, 209, 218)",
              marginY: "1rem",
              cursor: "pointer",
            }}>
            Contact Customer Services
          </Typography>
          <Typography
            sx={{
              marginTop: "1rem",
              fontWeight: "900",
              fontSize: "25px",
            }}>
            Feedback for Amazon Music
          </Typography>
          <Typography
            sx={{
              marginTop: "1rem",
              fontWeight: "900",
              fontSize: "16px",
            }}>
            Your candid feedback helps us to improve Amazon Music. While we
            can't reply to every customer directly, we do review and consider
            all comments.
          </Typography>
          <Typography
            sx={{
              color: "rgb(37, 209, 218)",
              marginY: "1rem",
              cursor: "pointer",
            }}>
            Send Us Feedback
          </Typography>
        </Container>
      </Container>
    </>
  );
}
