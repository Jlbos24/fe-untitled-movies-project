import React, { Component } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import CloseIcon from "@material-ui/icons/Close";
class ViewToggler extends Component {
  state = { isVisible: false };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#041B15", width: "100%", height: "30%" }}>
        <Container component="main" maxWidth="xs">
          <Grid container xs={12}>
            <Grid item xs={3}>
              <Button onClick={this.handleClick}>
                {this.state.isVisible ? (
                  <CloseIcon fontSize="large" color="secondary" />
                ) : (
                  <MenuOutlinedIcon color="secondary" fontSize="large" />
                )}
              </Button>
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
                width: "50px",
                height: "80px",
                alignItems: "center",
              }}
              item
              xs={6}
            >
              <div>
                <img
                  style={{
                    borderRadius: "55px",
                    width: "30px",
                    height: "30px",
                  }}
                  src={require("./map.png")}
                />
              </div>
              <div>
                <img
                  style={{
                    borderRadius: "55px",
                    height: "30px",
                  }}
                  src={require("./mapstar.png")}
                />
              </div>
            </Grid>
            <Grid
              style={{
                textAlign: "center",
                paddingTop: "15px",
              }}
              item
              xs={3}
            >
              <img
                style={{ width: "40px", height: "40px" }}
                src={require("./starw.png")}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {this.state.isVisible && this.props.children}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ViewToggler;
