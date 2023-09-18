import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardMedia, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function SignIn({ handleNotShow, setSignSuccess, signSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  handleNotShow();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password || !email) {
      setErrorMessage("All Fields must be filled");
      setErrorColor("red");
    } else if (!email.includes("@")) {
      setErrorMessage("Email is invalid");
      setErrorColor("red");
    } else {
      (async function () {
        try {
          const response = await fetch(
            "https://academics.newtonschool.co/api/v1/user/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                projectId: "8jf3b15onzua",
              },
              body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
                appType: "music",
              }),
            }
          );
          if (response.ok) {
            setErrorMessage("Login successful!");
            setErrorColor("green");
            setSignSuccess(true);
          } else {
            setErrorMessage("Incorrect EmailId or Password");
            setErrorColor("red");
          }
        } catch (error) {
          console.error("An error occurred");
        }
      })();
    }
  };

  return (
    <Card
      style={{
        backgroundColor: "white",
        height: "100vh",
        marginTop: "0rem",
      }}>
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
          <CloseIcon />
        </Button>
      </Link>
      <CardMedia
        sx={{
          height: "100px",
          width: "220px",
          marginLeft: "39.9%",
          marginTop: "4rem",
        }}
        image="https://static.toiimg.com/photo/msid-59847732/59847732.jpg"
        title="logo"
      />
      <Card sx={{ maxWidth: 345, marginLeft: "35%" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            marginBottom="5px"
            gutterBottom>
            Email
          </Typography>

          <TextField
            type="email"
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            variant="body1"
            fontWeight="bold"
            marginBottom="5px"
            marginTop="10px">
            Password
          </Typography>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography className="error" style={{ color: errorColor }}>
            {errorMessage}
          </Typography>
          {signSuccess ? (
            <>
              <Link to="/">
                <Button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    marginTop: "1rem",
                  }}>
                  Go to Home
                </Button>
              </Link>
            </>
          ) : (
            <>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  style={{
                    backgroundColor: "rgba(255,216,18,255)",
                    color: "black",
                  }}
                  onClick={handleLogin}>
                  Sign Up
                </Button>
              </CardActions>
              <Typography variant="caption">
                By continuing, you agree to Amazon's Conditions of Use and
                Privacy Notice.
              </Typography>

              <CardActions>
                <Link to="/signup">
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                    }}>
                    Create your amazon account
                  </Button>
                </Link>
              </CardActions>
            </>
          )}
        </CardContent>
      </Card>
    </Card>
  );
}
