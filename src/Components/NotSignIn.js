import { Button, Card, Typography } from "@mui/material";
import React from "react";
import bg from "../assests/bg.jpeg";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function NotSignIn({ handleNotShow }) {
  handleNotShow();
  return (
    <>
      <img src={bg} alt="background"></img>
      <Card
        style={{
          position: "absolute",
          top: "30%",
          left: "33%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "460px",
          background: "transparent",
          boxShadow: "none",
        }}>
        <Link to="/">
          <Button
            style={{
              color: "white",
              borderRadius: "50%",
              width: "25px",
              height: "60px",
              marginBottom: "3rem",
              left: "43%",
              background: "rgba(0, 0, 0, 0.4)",
            }}>
            <CloseIcon style={{ fontSize: "25px" }} />
          </Button>
        </Link>
        <Typography
          variant="h6"
          style={{ color: "white", fontWeight: "bolder" }}>
          Try Amazon Prime Music
        </Typography>
        <Typography
          variant="body"
          style={{ color: "white", marginTop: "1rem" }}>
          Ad-free music streaming included with Prime membership. Also includes
          free shipping and video streaming.
        </Typography>
        <Link to="/signin">
          <Button
            style={{
              margin: "2rem",
              border: "2px solid rgb(37, 209, 218)",
              color: "rgb(37, 209, 218)",
              borderRadius: "50px",
            }}>
            ALREADY A CUSTOMER? SIGN IN
          </Button>
        </Link>
      </Card>
    </>
  );
}
