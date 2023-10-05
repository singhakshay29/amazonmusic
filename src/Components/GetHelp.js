import React, { useEffect, useState } from "react";
import getbg from "../assests/getbg.png";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

export default function GetHelp() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);
  const [showButton, setShown] = useState(true);

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
            top: 170,
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
            }}>
            www.amazon.com
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
          {showButton ? (
            <>
              <Button
                sx={{
                  marginTop: "1rem",
                  color: "rgb(37, 209, 218)",
                  marginY: "1rem",
                  cursor: "pointer",
                  minHeight: "40px",
                  transition: "",
                  "&:hover": {
                    borderBottom: "2px solid rgb(37, 209, 218)",
                  },
                }}
                onClick={() => setShown(false)}>
                Send Us Feedback
              </Button>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  color: "rgb(37, 209, 218)",
                  marginY: "1rem",
                }}>
                www.amazon.com
              </Typography>
            </>
          )}
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
                  width: "400px",
                  height: "50px",
                  position: "absolute",
                  top: 80,
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
                  If you have a problem that requires assistance, please visit
                  our FAQs or contact Customer Services .
                </Typography>
                <Typography
                  sx={{
                    color: "rgb(37, 209, 218)",
                    marginY: "1rem",
                  }}>
                  www.amazon.com
                </Typography>
                <Typography
                  sx={{
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
                  Your candid feedback helps us to improve Amazon Music. While
                  we can't reply to every customer directly, we do review and
                  consider all comments.
                </Typography>

                {showButton ? (
                  <>
                    <Button
                      sx={{
                        marginTop: "1rem",
                        color: "rgb(37, 209, 218)",
                        marginY: "1rem",
                        cursor: "pointer",
                        minHeight: "40px",
                        transition: "",
                        "&:hover": {
                          borderBottom: "2px solid rgb(37, 209, 218)",
                        },
                      }}
                      onClick={() => setShown(false)}>
                      Send Us Feedback
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: "rgb(37, 209, 218)",
                        marginY: "1rem",
                      }}>
                      www.amazon.com
                    </Typography>
                  </>
                )}
              </Container>
            </Container>
          </>
        </>
      )}
    </>
  );
}
