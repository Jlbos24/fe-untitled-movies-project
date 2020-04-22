import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ReactS3 from "react-s3";
import keys from "../config.json";
import CssBaseline from "@material-ui/core/CssBaseline";

class Usercamera extends Component {
  state = {
    picData: "",
  };

  handleTakePhoto = (dataUri) => {
    const username = this.props.auth.user.username;
    const filename = `${Math.floor(Math.random() * 10000000000).toString()}`;
    const config = { ...keys.aws, dirName: username };

    const file = new File([dataUri], filename, {
      type: ".jpg",
    });

    ReactS3.uploadFile(file, config)
      .then((data) => {})
      .catch((err) => {
        alert(err);
      });
    this.setState({ picData: dataUri });
  };

  handleTakePhotoAnimationDone = (dataUri) => {};

  handleCameraError = (error) => {
    // Error handler needed here
    console.log(error);
  };

  handleCameraStart = (stream) => {};

  handleCameraStop = () => {};

  render() {
    return (
      <div>
        <CssBaseline />
        <Camera
          onTakePhoto={(dataUri) => {
            this.handleTakePhoto(dataUri);
          }}
          onTakePhotoAnimationDone={(dataUri) => {
            this.handleTakePhotoAnimationDone(dataUri);
          }}
          onCameraError={(error) => {
            this.handleCameraError(error);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={{ width: 640, height: 500 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          isMaxResolution={true}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={false}
          sizeFactor={1}
          onCameraStart={(stream) => {
            this.handleCameraStart(stream);
          }}
          onCameraStop={() => {
            this.handleCameraStop();
          }}
        />
      </div>
    );
  }
}

export default Usercamera;
