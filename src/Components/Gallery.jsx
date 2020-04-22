import React, { Component } from "react";
import ImageCard from "./ImageCard";
import ErrorHandler from "./ErrorHandler";
import aws from "aws-sdk";
import config from "../config.json";
import "typeface-roboto";
import { Grid, Typography, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

class Gallery extends Component {
  state = {
    userPics: [],
    isLoading: true,
    error: null,
  };

  getImages = async () => {
    try {
      aws.config.update({
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
        region: config.aws.region,
      });

      const userFolder = `${this.props.auth.user.username}/`;
      const s3 = new aws.S3();

      await s3
        .listObjectsV2({
          Bucket: "movieapp-users-images",
          Prefix: userFolder,
        })
        .promise()
        .then((data) => {
          this.setState({ userPics: data.Contents, isLoading: false });
        });
    } catch (error) {
      const message =
        "We have not being able to fetch your photos, please go back to your profile and try again";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    this.getImages();
  }

  render() {
    const { classes } = this.props;
    if (this.state.isLoading) return "Loading ....";

    if (!this.state.isLoading) {
      return (
        <Container className={classes.bg} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography color="secondary" component="h6" variant="h2">
                  Gallery
                </Typography>
              </Grid>
              <ErrorHandler apierrors={this.state.error} />
              {this.state.userPics.map((item) => {
                return (
                  <Grid item xs={6}>
                    <ImageCard imageKey={item.Key} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Container>
      );
    }
  }
}
export default withStyles(useStyles)(Gallery);
