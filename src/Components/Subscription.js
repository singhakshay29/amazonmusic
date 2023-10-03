import React from "react";
import { Link } from "react-router-dom";
import subpack from "../assests/subpack.png";
import { Button, Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import extrafeatures from "../assests/extrafeatures.png";

export default function Subscription({ handleNotShow }) {
  handleNotShow?.();
  return (
    <Card>
      <Link to="/">
        <Button
          style={{
            position: "absolute",
            color: "white",
            borderRadius: "50%",
            width: "25px",
            height: "60px",
            left: "94.9%",
            background: "rgba(0, 0, 0, 0.4)",
          }}>
          <CloseIcon style={{ fontSize: "20px" }} />
        </Button>
      </Link>
      <img
        style={{ height: "100vh", width: "100vw" }}
        src={subpack}
        alt="subscriptionPlan"></img>
      <Card
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}>
        <img src={extrafeatures} width="850px" alt="extraFeatures"></img>
      </Card>
    </Card>
  );
}
