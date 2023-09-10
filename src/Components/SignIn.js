import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardMedia, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <Card
      style={{
        backgroundColor: "white",
        height: "100vh",
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
            Email or mobile phone number
          </Typography>

          <TextField type="email" variant="outlined" fullWidth />
          <Typography
            variant="body1"
            fontWeight="bold"
            marginBottom="5px"
            marginTop="10px">
            Password
          </Typography>
          <TextField type="password" variant="outlined" fullWidth />
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              style={{
                backgroundColor: "rgba(255,216,18,255)",
                color: "black",
              }}>
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
