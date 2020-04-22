import React from "react";
import axios from "axios";
import config from "../config.json";
import ErrorHandler from "./ErrorHandler";
import typeface from "typeface-roboto";
import "../App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "column",
    alignItems: "center",
  },
  favourite: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    align: "center",
    fontSize: "1.2em",
  },
  heroContent: {
    background: "linear-gradient(30deg, #A8D0DB 30%, #5E548E 95%)",

    padding: theme.spacing(4, 0, 3),
  },
  media: {
    width: 322,
    height: 322,
    objectFit: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
  genreImage: {
    margin: theme.spacing(2),
    width: "80px",
    height: "120px",
    borderRadius: "10px",
    boxShadow: " 2px 3px 5px black",
  },
  mainbg: {
    background: "linear-gradient(30deg, #A8D0DB 30%, #5E548E 95%)",

    color: "white",
  },
  badges: {
    backgroundColor: "#A8D0DB",
    height: "100vh",
  },
  badgeItems: {
    borderTop: "1px solid #747C92",
    height: "60px",
    display: "flex",
    flexDirection: "row",
    padding: "3px",
    backgroundColor: "#f3EDE2",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  visitInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  avatarInfo: {
    display: "flex",
    flexDirection: "row",
  },
  rank: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  badgeArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

class Profile extends React.Component {
  state = {
    profile: {},
    genres: [],
    username: this.props.auth.user.username,
    error: null,
  };

  fetchProfile = async () => {
    const { username } = this.state;
    console.log(username);
    try {
      const res = await axios.get(
        `${config.api.invokeURL}/profile/${this.state.username}`
      );

      const profile = res.data;
      this.setState({ profile: profile });
    } catch (error) {
      const message =
        "We have not being able to fetch your profile, please log out and try again.";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    this.fetchProfile();
  }

  render() {
    const { classes } = this.props;

    const {
      genre1,
      genre2,
      genre3,
      avatar_url,
      g1_avatar,
      g2_avatar,
      g3_avatar,
    } = this.state.profile;

    const cards = [
      {
        genre: genre1,
        image: g1_avatar,
      },
      {
        genre: genre2,
        image: g2_avatar,
      },
      {
        genre: genre3,
        image: g3_avatar,
      },
    ];

    return (
      <>
        <ErrorHandler apierrors={this.state.error} />

        <main>
          <div className={classes.mainbg}>
            <div className={classes.heroContent}>
              <Container maxWidth="xs">
                <Typography
                  component="h4"
                  variant="h4"
                  align="center"
                  gutterBottom
                >
                  <div style={{ textAlign: "center", fontSize: "1.5em" }}>
                    {`Hello ${this.state.username}`}{" "}
                  </div>
                </Typography>
                <Grid className={classes.avatarInfo} maxWidth="xs">
                  <Grid item xs={5}>
                    <div className={classes.root}>
                      <img
                        style={{
                          width: "120px",
                          height: "120px",
                        }}
                        src={require("./starw.png")}
                      />
                    </div>
                  </Grid>
                  <Grid className={classes.rank} item xs={6}>
                    <div style={{ textAlign: "center", fontSize: "1.5em" }}>
                      Current ranking:
                    </div>
                    <div className={classes.badgeArea}>
                      <div className={classes.root}>
                        <img
                          style={{ width: "60px", height: "80px" }}
                          src={require("./currentRank.svg")}
                        />
                      </div>
                      <div style={{ textAlign: "center", fontSize: "5em" }}>
                        67
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>

            <Container component="main" maxWidth="xs">
              <Grid
                className={classes.sectionheader}
                color="primary"
                item
                xs={12}
              >
                <Divider />
                <Typography className={classes.favourite} component="h6">
                  Favourite Films
                </Typography>
              </Grid>
              <Grid container xs={12}>
                {cards.map((card, index) => {
                  return (
                    <Grid item xs={4}>
                      <img className={classes.genreImage} src={card.image} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
            {/* Just for show now */}
            <div className={classes.badges}>
              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img width="40px" src={require("./popcom.png")} />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  First person to get here!
                </Grid>
              </Grid>

              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img width="40px" src={require("./jv.png")} />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  Visited a Horror location!
                </Grid>
              </Grid>

              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img width="40px" src={require("./aircraft-engine.png")} />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  Visted over 40 locations
                </Grid>
              </Grid>

              <Grid className={classes.badgeItems} container xs={12}>
                <Grid className={classes.badge} xs={3}>
                  <img width="40px" src={require("./icon1.ico")} />
                </Grid>
                <Grid className={classes.visitInfo} xs={7}>
                  Visited most of something
                </Grid>
              </Grid>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(Profile);
