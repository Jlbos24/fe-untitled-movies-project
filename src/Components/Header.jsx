import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Header = () => {
  return (
    <Container component="header" maxWidth="lg">
      <CssBaseline />
      <Typography variant="h2" color="textPrimary" align="center">
        Movie Map
      </Typography>
    </Container>
  );
};

export default Header;
