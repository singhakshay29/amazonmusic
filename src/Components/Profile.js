import { Typography, CardActions, CardContent } from "@mui/material";
import user from "../assests/user.png";
import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Profile() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 880);
  const [userName, setUserName] = useState("");
  const [gmail, setGmail] = useState("");

  function getTheUserDetails() {
    const userData = localStorage.getItem("signupDeatils");
    if (userData) {
      const parseData = JSON.parse(userData);
      setUserName(parseData.signup?.data.name);
      setGmail(parseData.signup?.data.email);
    }
  }
  useEffect(() => {
    getTheUserDetails();
    // eslint-disable-next-line
  }, []);

  const card = (
    <React.Fragment>
      <div style={{ marginLeft: "30rem", maxWidth: "60%", height: "10px" }}>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontFamily: "Gabarito",
            fontSize: "5rem",
            overflow: "hidden",
            marginTop: "5rem",
            textTransform: "capitalize",
          }}
          className="font"
          component="div">
          {userName}
        </Typography>
        <Typography
          style={{
            color: "white",
            textAlign: "center",
          }}
          variant="h6">
          {gmail}
        </Typography>

        <CardActions>
          <Link to="/setup">
            <button className="spbplay">
              <FaPencilAlt style={{ fontSize: "1rem", margin: "5px" }} />
            </button>
          </Link>
        </CardActions>
        <div
          style={{
            marginTop: "5rem",
            // textAlign: "center",
            fontSize: "17px",
          }}>
          Create playlists to view more content
        </div>
      </div>
    </React.Fragment>
  );

  const cardResponsive = (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            flexWrap: "wrap",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            textTransform: "capitalize",
          }}
          component="div">
          {userName}
        </Typography>
        <Typography
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "2rem",
          }}
          variant="h6">
          {gmail}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/setup">
          <button className="spbplay">
            <FaPencilAlt style={{ fontSize: "1rem", margin: "5px" }} />
          </button>
        </Link>
      </CardActions>
      <div
        style={{
          // position: "fixed",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          //   left: "calc((100% - 24px) - 510px)",
          //   top: "40rem",
          fontSize: "17px",
          marginTop: "2rem",
        }}>
        Create playlists to view more content
      </div>
    </React.Fragment>
  );
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <>
          <div
            style={{
              backgroundImage: `url(${user})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: "100%",
              height: "750px",
              filter: "blur(10px)",
              marginTop: "-7rem",
              backgroundColor: "rgba(15, 17, 17, 0.7)",
            }}></div>
          <div
            style={{
              backgroundColor: "rgba(15, 17, 17, 0.7)",
              width: "100%",
              height: "800px",
              position: "absolute",
              marginTop: "-7rem",
              top: 0,
            }}></div>
          <div className="pI">
            <img
              src={user}
              className="image"
              style={{ borderRadius: "50%" }}
              alt="user"
            />
            <div className="iD">{cardResponsive}</div>
          </div>

          <div
            style={{
              marginTop: "10rem",
              width: "100%",
              marginBottom: "20rem",
            }}></div>
        </>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(${user})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "42rem",
              filter: "blur(10px)",
              marginTop: "1rem",
            }}></div>
          <div
            style={{
              backgroundColor: "rgba(15, 17, 17, 0.7)",
              width: "100%",
              height: "42rem",
              position: "absolute",
              marginTop: "1rem",
              top: 0,
            }}></div>
          <img
            src={user}
            alt="user"
            style={{ borderRadius: "50%" }}
            className="pI imgP playlistMainI"
          />
          <div className="pI playlistMainI">
            <div
              style={{
                background: "transparent",
                boxShadow: "none",
                marginLeft: "2rem",
              }}>
              {card}
            </div>
          </div>
        </>
      )}
    </>
  );
}
