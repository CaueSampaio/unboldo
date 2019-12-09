import React, { Component } from "react";
import { Row, Col } from "antd";

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
        <div className="video-wrapper">
          <video
            className="background-video"
            src="../../assets/videos/home.mp4"
            autoPlay
            loop
          ></video>
          <button className="schedule-button" onClick={() => alert("hello")}>
            agendar
          </button>
        </div>
        <div className="mosaico">
          <Row>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/back.jpg"
                alt="back"
              />
            </Col>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/just-have-sun.jpg"
                alt="back"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/look-sunshine.jpg"
                alt="back"
              />
            </Col>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/sun-face.jpg"
                alt="back"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/sand-back.jpg"
                alt="back"
              />
            </Col>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/meet-me.jpg"
                alt="back"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/feel-like-sunshine.jpg"
                alt="back"
              />
            </Col>
            <Col xs={24} md={12} className="mosaico-img-container">
              <img
                className="mosaico-img"
                src="../../assets/images/models.jpg"
                alt="back"
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
