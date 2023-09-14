import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardMedia, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password || !email) {
      setErrorMessage("All Fields must be filled");
      setErrorColor("red");
    } else if (!email.includes("@")) {
      setErrorMessage("Email is invalid");
      setErrorColor("red");
    } else {
      (async function signup() {
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
      })();
    }
  };

  return (
    <Card
      style={{
        backgroundColor: "white",
        height: "110vh",
        marginTop: "5rem",
      }}>
      <CardMedia
        sx={{ height: "100px", width: "220px", marginLeft: "39%" }}
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
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </Typography>
          <Typography></Typography>
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
        </CardContent>
      </Card>
    </Card>
  );
}
