import { Link } from "react-router-dom";
import DataContext from "../DataContext";
import React, { useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Button, Typography, MobileStepper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
let finalvalue;
export default function HeadingComponent({
  data,
  heading,
  handleNext,
  handleBack,
  currentData,
}) {
  const theme = useTheme();
  const { setSeeAllData, setHeading } = useContext(DataContext);
  const handleData = (data, heading) => {
    setSeeAllData(data);
    setHeading(heading);
  };

  useEffect(() => {
    function setIndexValue() {
      if (heading === "Popular Album" || heading === "Artists") {
        finalvalue = 40;
      } else if (heading === "Romantic Songs" || heading === "Sad Songs") {
        finalvalue = 17;
      } else if (heading === "Happy Songs" || heading === "Excited Songs") {
        finalvalue = 5;
      }
    }
    setIndexValue();
  }, [heading]);

  return (
    <div className="hd2">
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "22px",
          paddingTop: "10px",
          textTransform: "capitalize",
        }}
        variant="h4">
        {heading}
      </Typography>
      <div className="hcd2">
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={currentData}
          sx={{
            background: "transparent",
            marginBottom: "10px",
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={currentData === finalvalue}
              style={{
                color: currentData === finalvalue ? "grey" : "white",
              }}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={currentData === 0}
              style={{
                color: currentData === 0 ? "grey" : "white",
              }}>
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
        <Link to="/seeall">
          <button
            onClick={() => handleData(data, heading)}
            className="spb "
            style={{
              fontSize: "0.8rem",
              height: "33px",
              marginTop: "8px",
              overflow: "hidden",
            }}>
            SEE ALL
          </button>
        </Link>
      </div>
    </div>
  );
}
