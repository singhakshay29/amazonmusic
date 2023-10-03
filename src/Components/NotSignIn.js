import getbg from "../assests/getbg.png";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@mui/material";
export default function NotSignIn() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardResponsive = (
    <React.Fragment>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Container
          sx={{
            width: "100%",
            maxWidth: "400px",
            height: "50px",
            position: "absolute",
            top: 100,
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
            width: "100%",
            maxWidth: "700px",
            height: "170px",
            position: "absolute",
            top: 250,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography sx={{ fontWeight: "900", fontSize: "25px" }}>
            Try Amazon Prime Music
          </Typography>
          <Typography
            sx={{
              marginTop: "1rem",
              fontWeight: "900",
              fontSize: "20px",
            }}>
            Ad-free music streaming included with Prime membership. Also
            includes free shipping and video streaming.
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
        </Container>
      </Container>
    </React.Fragment>
  );

  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              backgroundImage: `url(${getbg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: "100%",
              height: "750px",
              filter: "blur(10px)",
              marginTop: "-7rem",
            }}></div>
          <div
            style={{
              backgroundColor: "rgba(15, 17, 17, 0.8)",
              width: "100%",
              height: "750px",
              position: "absolute",
              marginTop: "-7rem",
              top: 0,
            }}></div>
          <div className="pI">
            <div
              style={{
                position: "absolute",
                width: "370px",

                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}>
              {cardResponsive}
            </div>
          </div>
        </>
      ) : (
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
                top: 260,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Typography sx={{ fontWeight: "900", fontSize: "25px" }}>
                Try Amazon Prime Music
              </Typography>
              <Typography
                sx={{
                  marginTop: "1rem",
                  fontWeight: "900",
                  fontSize: "20px",
                }}>
                Ad-free music streaming included with Prime membership. Also
                includes free shipping and video streaming.
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
            </Container>
          </Container>
        </>
      )}
    </>
  );
}
