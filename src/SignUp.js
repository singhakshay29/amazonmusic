import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardMedia, TextField, Typography } from "@mui/material";

export default function SignUp() {
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
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            marginBottom="5px"
            gutterBottom>
            Email
          </Typography>
          <TextField type="email" size="small" variant="outlined" fullWidth />
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
            placeholder="At least 6 characters"
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            marginBottom="5px"
            marginTop="10px">
            Re-enter password
          </Typography>
          <TextField
            type="password"
            size="small"
            variant="outlined"
            fullWidth
          />
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              style={{
                backgroundColor: "rgba(255,216,18,255)",
                color: "black",
              }}>
              Create your amazon account
            </Button>
          </CardActions>
          <Typography variant="caption">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </Typography>
        </CardContent>
      </Card>
    </Card>
  );
}
