/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import getbg from "../assests/getbg.png";
//import Amazon from "../assests/Amazon.pdf";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Container, Typography } from "@mui/material";

export default function Term() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
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
            top: 20,
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
            top: 90,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography sx={{ fontWeight: "900", fontSize: "30px" }}>
            Amazon Music Terms of Use
          </Typography>

          <Typography
            sx={{
              marginTop: "1rem",
              fontWeight: "900",
              fontSize: "16px",
            }}>
            This is an agreement between you and the entity providing Amazon
            Music to you, which may be, depending on your country of residence
            (your “Location”), Amazon.com Services LLC, Amazon.com.ca, Inc.,
            Amazon Digital UK Ltd, Amazon Digital Germany GmbH, Amazon Digital
            France SAS, Amazon Digital Italy S.R.L., Amazon Digital Spain
            S.L.U., Amazon.com Sales, Inc., Amazon Seller Services Private
            Limited; Amazon Australia Services Inc., Amazon Commercial Services
            Pty Ltd, Servicios Comerciales Amazon México, S. de R.L. de C.V.,
            Amazon Serviços de Varejo do Brasil Ltda., or one of their
            affiliates ("Amazon," "we," or "us"). This agreement governs your
            use of the personalized services available in your Location
            (Unlimited, Amazon Music Prime, Amazon Music (free with ads), and
            the Store, collectively, the "Services"). Visit Amazon Music Service
            Provider Information and Applicable Terms and Policies to identify
            the Amazon affiliate that provides the Services to you and other
            applicable terms based on your Location. The Amazon Music
            marketplace is your primary website for accessing the Services
            ("Music Marketplace").
          </Typography>
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
                  width: "800px",
                  height: "50px",
                  position: "absolute",
                  top: 20,
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
                  top: 140,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Typography sx={{ fontWeight: "900", fontSize: "30px" }}>
                  Amazon Music Terms of Use
                </Typography>
                <Typography
                  sx={{
                    marginTop: "1rem",
                    fontWeight: "300",
                    fontSize: "16px",
                  }}>
                  This is an agreement between you and the entity providing
                  Amazon Music to you, which may be, depending on your country
                  of residence (your “Location”), Amazon.com Services LLC,
                  Amazon.com.ca, Inc., Amazon Digital UK Ltd, Amazon Digital
                  Germany GmbH, Amazon Digital France SAS, Amazon Digital Italy
                  S.R.L., Amazon Digital Spain S.L.U., Amazon.com Sales, Inc.,
                  Amazon Seller Services Private Limited; Amazon Australia
                  Services Inc., Amazon Commercial Services Pty Ltd, Servicios
                  Comerciales Amazon México, S. de R.L. de C.V., Amazon Serviços
                  de Varejo do Brasil Ltda., or one of their affiliates
                  ("Amazon," "we," or "us"). This agreement governs your use of
                  the personalized services available in your Location
                  (Unlimited, Amazon Music Prime, Amazon Music (free with ads),
                  and the Store, collectively, the "Services"). Visit Amazon
                  Music Service Provider Information and Applicable Terms and
                  Policies to identify the Amazon affiliate that provides the
                  Services to you and other applicable terms based on your
                  Location. The Amazon Music marketplace is your primary website
                  for accessing the Services ("Music Marketplace").
                </Typography>
              </Container>
            </Container>
          </>
        </>
      )}
    </>
  );
}
