import React, { Component } from 'react';
import { getMovieId, getMovieLocations } from '../Utils/movies';
import * as api from '../Utils/api';
// import DisplayMarkers from "./DisplayMarkers";
import NewWrappedMap from './NewMovieMap';
import APIKey from '../config';

class SearchMovie extends Component {
  state = {
    movieTitle: '',
    coordinates: [],
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movieTitle: value }, () => {
      //console.log(this.state.movieTitle);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    getMovieId(this.state.movieTitle).then((movieId) => {
      getMovieLocations(movieId).then((addresses) => {
        // need a promise all,
        // should resolve when you have all the api data
        // THEN you can set state

        return Promise.all(
          addresses.map((address) => api.getLatLng(address))
        ).then((coords) => {
          this.setState({ coordinates: coords });
        });

        // const coords = [];
        // addresses.forEach((address) => {
        //   api.getLatLng(address).then((latLng) => {
        //     coords.push(latLng);
        //   });
        // });
        //figure out how to deal with errors/empty coordinates
      });
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            id="movie-search"
            type="text"
            onChange={this.handleChange}
          ></input>
          <button id="movie-search">Search Movie</button>
        </form>
        {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}
        <div style={{ width: '75%', height: '100vh' }}>
          <NewWrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
            loadingElement={<div style={{ height: '100' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            coordinates={this.state.coordinates}
          />
        </div>
      </>
    );
  }
}

export default SearchMovie;

// { lat: 55.378051, lng: -3.435973 },
//       { lat: 56.49067119999999, lng: -4.2026458 },
//       { lat: 52.3555177, lng: -1.1743197 },