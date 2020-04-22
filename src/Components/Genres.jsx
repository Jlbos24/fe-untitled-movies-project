import React from "react";
import axios from "axios";
import config from "../config.json";
import ErrorHandler from "./ErrorHandler";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "column",
    alignItems: "center",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  account: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 322,
  },
  media: {
    width: 322,
    height: 322,
    objectFit: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 8, 2),
  },
  submitbutton: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class Genres extends React.Component {
  state = {
    genres: [],
    username: this.props.auth.user.username,
    message: "",
    num: 1,
    genre1: "",
    g1_avatar: "",
    genre2: "",
    g2_avatar: "",
    genre3: "",
    g3_avatar: "",

    error: null,
    success: null,
  };

  fetchGenres = async () => {
    try {
      const response = await axios.get(`${config.api.invokeURL}/genres/`);
      const genres = response.data;

      this.setState({ genres: genres });
    } catch (error) {
      const message =
        "We have not being able to load the genre selection, please go back to your profile and try again";

      this.setState({
        error: { message },
      });
    }
  };

  selectGenre = (event) => {
    let { num } = this.state;
    const genre = event.target.name;
    const avatar = event.target.src;

    if (num < 4) {
      console.log(num);
      if (num === 1) {
        this.setState({ genre1: genre, g1_avatar: avatar, num: 2 });
      }

      if (num === 2) {
        this.setState({ genre2: genre, g2_avatar: avatar, num: 3 });
      }

      if (num === 3) {
        this.setState({ genre3: genre, g3_avatar: avatar, num: 4 });
      }
    }
  };

  saveGenres = () => {
    const { genre1, genre2, genre3 } = this.state;
    if (genre1 === "" || genre2 === "" || genre3 === "") {
      this.setState({ message: "Select Another Movie" });
    } else {
      this.updateProfile();

      this.setState({
        num: 1,
        genre1: "",
        g1_avatar: "",
        genre2: "",
        g2_avatar: "",
        genre3: "",
        g3_avatar: "",
      });
    }
  };

  updateProfile = async () => {
    const {
      username,
      genre1,
      g1_avatar,
      genre2,
      g2_avatar,
      genre3,
      g3_avatar,
    } = this.state;

    try {
      const params = {
        username: username,
        genre1: genre1,
        g1_avatar: g1_avatar,
        genre2: genre2,
        g2_avatar: g2_avatar,
        genre3: genre3,
        g3_avatar: g3_avatar,
      };

      console.log(params, "params");

      await axios
        .patch(`${config.api.invokeURL}/profile/${username}`, params)
        .then((res) => {
          const status = res.status;
          const message = "Changes saved";
          this.setState({
            success: { message, status },
          });
        });
    } catch (error) {
      const message =
        "We have not being able to update your favourite genre's, please go back to your profile and try again";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    this.fetchGenres();
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <CssBaseline />
        <AppBar position="relative"></AppBar>

        <main>
          <Container className={classes.cardGrid} spacing={2}>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              Pick your favourites
              {this.state.message}
              <ErrorHandler
                apierrors={this.state.error}
                success={this.state.success}
              />
            </Typography>

            <Grid
              container
              spacing={4}
              alignItems="center"
              disabled={this.state.i > 2}
            >
              {this.state.genres.map(({ genre, g_avatar }, i) => {
                return (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <Button onClick={this.selectGenre} key={i}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.media}
                          component="img"
                          alt=""
                          image={g_avatar}
                          name={genre}
                          title=""
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography
                            gutterBottom
                            variant="subtitle2"
                            align="justify"
                          >
                            {genre}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
            <button onClick={this.saveGenres}>Save</button>
          </Container>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(Genres);
