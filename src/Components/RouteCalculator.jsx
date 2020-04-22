import React, { Component } from "react";
import { DirectionsRenderer } from "react-google-maps";
import ViewToggler from "./ViewToggler";
import MovieCard from "./MovieCard";
import ViewTogglerDirections from "./ViewTogglerDirections";
import ViewTogglerInfo from "./ViewTogglerInfo";

class RouteCalculator extends Component {
  state = {
    userLocation: null,
    directions: null,
    textDirections: true,
    movieInfo: null,
  };

  componentDidMount() {
    this.setState({ userLocation: this.props.userLocation });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userLocation !== this.state.userLocation) {
      this.setState({ userLocation: this.props.userLocation });
    }
    if (this.props.movieInfo !== this.state.movieInfo) {
      this.setState({ movieInfo: this.props.movieInfo });
    }
    if (
      this.props.destination !== prevProps.destination ||
      this.props.stops !== prevProps.stops
    ) {
      if (this.state.directions !== prevState.directions) {
        this.setState({ textDirections: false });
      }

      this.setState({ directions: null });

      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(
            this.state.userLocation.lat,
            this.state.userLocation.lng
          ),
          destination: new window.google.maps.LatLng(
            this.props.destination.lat,
            this.props.destination.lng
          ),

          waypoints: this.props.stops.map((stop) => {
            return {
              location: new window.google.maps.LatLng(stop.lat, stop.lng),
            };
          }),
          travelMode: "DRIVING",
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: { ...result },
              textDirections: true,
            });
          } else {
            console.dir("console.dir", result);
          }
        }
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.directions && (
          <DirectionsRenderer
            defaultDirections={this.state.directions}
            panel={document.getElementById("panel")}
          />
        )}
        <ViewTogglerDirections>
          {this.state.textDirections && <div id="panel"></div>}
        </ViewTogglerDirections>

        <ViewTogglerInfo>
          {this.state.movieInfo &&
            this.state.movieInfo.map((info) => {
              return <MovieCard key={info.movieLocation} {...info} />;
            })}
        </ViewTogglerInfo>
      </div>
    );
  }
}

export default RouteCalculator;
