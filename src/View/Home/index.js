import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BackgroundVideo from "react-background-video-player";

import "./styles.css";
// import { Container } from './styles';
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth
    };
  }
  render() {
    const { width } = this.state;
    return (
      <div className="home-container">
        <div className="content">
          <BackgroundVideo
            containerWidth={width}
            containerHeight={300}
            src="../../assets/videos/home.mp4"
          >
            <div className="schedule">Clique aqui para agendar</div>
          </BackgroundVideo>
        </div>
      </div>
    );
  }
}

export default Home;
