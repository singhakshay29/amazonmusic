import {
  Card,
  Button,
  TextField,
  CardMedia,
  Container,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import AuthContext from "./AuthContex";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext } from "react";

export default function SignUp() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [finalpassword, setfinalPassword] = useState("");
  const { saveSignupData, signSuccess } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setUsername(username);
      setErrorMessage("All Fields must be filled");
      setErrorColor("red");
    } else if (!email.includes("@")) {
      setErrorMessage("Email is invalid");
      setErrorColor("red");
    } else if (password !== finalpassword) {
      setErrorMessage("Password does not match");
      setErrorColor("red");
    } else {
      (async function () {
        try {
          const response = await fetch(
            "https://academics.newtonschool.co/api/v1/user/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                projectId: "8jf3b15onzua",
              },
              body: JSON.stringify({
                name: `${username}`,
                email: `${email}`,
                password: `${password}`,
                appType: "music",
              }),
            }
          );
          if (response.ok) {
            const responseData = await response.json();
            saveSignupData(responseData);
            setErrorMessage("SignUp successful!");
            setErrorColor("green");
            navigator("/");
          } else if (response.status === 403) {
            setErrorMessage("User already exists");
            setErrorColor("red");
          } else {
            setErrorMessage("Incorrect EmailId or Password");
            setErrorColor("red");
          }
        } catch (error) {
          console.error("An error occurred:", error);
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
            <Typography variant="h5" gutterBottom>
              Create account
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              marginBottom="5px"
              gutterBottom>
              Your name
            </Typography>
            <TextField
              type="text"
              size="small"
              placeholder="First and last name"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography
              variant="body2"
              fontWeight="bold"
              marginBottom="5px"
              gutterBottom>
              Email
            </Typography>
            <TextField
              type="email"
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              variant="body2"
              fontWeight="bold"
              marginBottom="5px"
              marginTop="10px">
              Password
            </Typography>
            <TextField
              type="password"
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              variant="body2"
              fontWeight="bold"
              marginBottom="5px"
              marginTop="10px"
              value={finalpassword}>
              Re-enter password
            </Typography>
            <TextField
              type="password"
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Re-Enter Password"
              onChange={(e) => setfinalPassword(e.target.value)}
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
                    onClick={handleSignUp}>
                    Create your amazon account
                  </Button>
                </CardActions>
                <Typography variant="caption">
                  By continuing, you agree to Amazon's Conditions of Use and
                  Privacy Notice.
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Card>
    </>
  );
}
