import React, { useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContex";
import {
  Card,
  Button,
  Container,
  TextField,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";

export default function SignIn() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const { saveSignupData, signSuccess } = useContext(AuthContext);

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
            const responseData = await response.json();
            saveSignupData(responseData);
            setErrorMessage("Login successful!");
            setErrorColor("green");
            navigator("/");
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
    <>
      <Card
        style={{
          backgroundColor: "white",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Container
          sx={{
            width: "100%",
            maxWidth: "400px",
            height: "50px",
            position: "absolute",
            top: 40,
            textAlign: "right",
          }}>
          <Link to="/">
            <Button
              sx={{
                backdropFilter: "blur(10px)",
                color: "white",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                boxShadow: "none",
                width: "55px",
                height: "60px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  width: "58px",
                  height: "61px",
                },
              }}>
              <CloseIcon />
            </Button>
          </Link>
        </Container>

        <CardMedia
          sx={{
            height: "100px",
            width: "220px",
            marginTop: "1rem",
          }}
          image="https://static.toiimg.com/photo/msid-59847732/59847732.jpg"
          title="logo"
        />
        <Card sx={{ maxWidth: 345 }}>
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
                    Sign In
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
    </>
  );
}
