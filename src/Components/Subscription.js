import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import "../assests/Amazon-Music-pricing-2048x1152.png";
import extrafeatures from "../assests/extrafeatures.png";

export default function Subscription() {
  return (
    <Card sx={{ mt: "5rem" }}>
      <img
        style={{ height: "100vh", width: "100vw" }}
        src="https://centsr.com/wp-content/uploads/2022/07/Amazon-Music-pricing-2048x1152.png"
        alt="subscriptionPlan"></img>
      <Card
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}>
        <img src={extrafeatures} width="850px" alt="extraFeatures"></img>
        {/* <CardMedia image="../assests/extrafeatures.png"></CardMedia> */}
      </Card>
    </Card>
  );
}
