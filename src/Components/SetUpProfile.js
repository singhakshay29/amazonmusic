import React, { useEffect, useState } from "react";
import profilebg from "../assests/profilebg.png";
import { Button, CardMedia, Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import user from "../assests/user.png";
//Responsive pending

export default function SetUpProfile() {
  const [userName, setUserName] = useState("");
  const [updateName, setupdateName] = useState();
  const handleChange = (e) => {
    e.preventDefault();
    if (updateName !== userName && updateName) {
      const userData = localStorage.getItem("signupDeatils");
      if (userData) {
        const parseData = JSON.parse(userData);
        parseData.signup.data.name = updateName;
        localStorage.setItem("signupDeatils", JSON.stringify(parseData));
      }
    }
    getTheUserDetails();
  };

  function getTheUserDetails() {
    const userData = localStorage.getItem("signupDeatils");
    if (userData) {
      const parseData = JSON.parse(userData);
      setUserName(parseData.signup?.data.name);
    }
  }
  useEffect(() => {
    getTheUserDetails();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${profilebg})`,
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
          backgroundColor: "rgba(15, 17, 17, 0.4)",
          width: "100%",
          height: "37rem",
          position: "absolute",
          marginTop: "5rem",

          top: 0,
        }}></div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",

          marginBottom: "10rem",
        }}>
        <Container
          sx={{
            width: "400px",
            height: "50px",
            position: "absolute",
            top: 140,
            textAlign: "right",
          }}>
          <Link to="/profile">
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
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
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
            width: "400px",
            height: "170px",
            position: "absolute",

            top: 200,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography sx={{ fontWeight: "800", fontSize: "18px" }}>
            Set up Profile
          </Typography>
          <CardMedia
            component="img"
            image={user}
            alt="user"
            sx={{
              borderRadius: "50%",
              width: "40%",
              marginLeft: "30%",
              marginTop: "1rem",
            }}
          />
        </Container>
        <Container
          sx={{
            width: "400px",
            height: "180px",
            position: "absolute",
            top: 390,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography sx={{ textTransform: "capitalize", fontWeight: "700" }}>
            {userName}
          </Typography>
          <input
            placeholder="Change user name"
            type="text"
            value={updateName}
            onChange={(e) => setupdateName(e.target.value)}
            className="hoveractive"></input>
          <Typography sx={{ marginY: "1rem" }}>
            Who can follow your activity
          </Typography>
          <select
            // placeholder="Everyone"
            style={{
              backgroundColor: "rgba(15, 17, 17, 0.7)",
              width: "350px",
              borderRadius: "20px",
              height: "40px",
              textAlign: "center",
              paddingX: "30px",
            }}>
            <option value="EVERYONE">EVERYONE</option>
            <option value="NO ONE">NO ONE</option>
          </select>

          <br />
          <Link to="/profile">
            <button
              onClick={(e) => handleChange(e)}
              style={{ marginTop: "2rem" }}
              className="spbplay">
              Save
            </button>
          </Link>
        </Container>
      </Container>
    </>
  );
}
