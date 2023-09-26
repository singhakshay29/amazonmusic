import {
  Card,
  Button,
  TextField,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp({
  signSuccess,
  setUserName,
  handleNotShow,
  setSignSuccess,
}) {
  handleNotShow();
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [finalpassword, setfinalPassword] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  setUserName(username);

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
            localStorage.setItem(
              "signupDeatils",
              JSON.stringify({
                signup: responseData,
              })
            );
            setErrorMessage("SignUp successful!");
            setErrorColor("green");
            setSignSuccess(true);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
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
          <Card
            style={{
              backgroundColor: "white",
              height: "110vh",
              marginTop: "0rem",
            }}>
            <CardMedia
              sx={{
                height: "100px",
                width: "220px",
                marginLeft: "25%",
                marginTop: "3rem",
              }}
              image="https://static.toiimg.com/photo/msid-59847732/59847732.jpg"
              title="logo"
            />
            <Card sx={{ maxWidth: 345, marginLeft: "18%" }}>
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
      ) : (
        <>
          <Card
            style={{
              backgroundColor: "white",
              height: "110vh",
              marginTop: "0rem",
            }}>
            <CardMedia
              sx={{
                height: "100px",
                width: "220px",
                marginLeft: "39%",
                marginTop: "3rem",
              }}
              image="https://static.toiimg.com/photo/msid-59847732/59847732.jpg"
              title="logo"
            />
            <Card sx={{ maxWidth: 345, marginLeft: "35%" }}>
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
      )}
    </>
  );
}
