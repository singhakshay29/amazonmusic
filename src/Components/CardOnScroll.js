import React from "react";
import { Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function CardOnScroll({
  handleLeftArrowClick,
  currentDataIndex,
  handleRightArrowClick,
  disabled,
  heading,
  disabledRight,
}) {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "30px" }} variant="h4">
        {heading}
      </Typography>
      <Card style={{ background: "transparent" }}>
        <Button
          onClick={handleLeftArrowClick}
          disabled={currentDataIndex === 1}>
          {disabled ? (
            <KeyboardArrowLeftIcon style={{ color: "grey" }} />
          ) : (
            <KeyboardArrowLeftIcon style={{ color: "white" }} />
          )}
        </Button>
        <Button onClick={handleRightArrowClick}>
          {disabledRight ? (
            <KeyboardArrowRightIcon style={{ color: "grey" }} />
          ) : (
            <KeyboardArrowRightIcon style={{ color: "white" }} />
          )}
        </Button>
      </Card>
    </Container>
  );
}
