import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

// import { Container } from './styles';

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <div className="container">
          <div className="header">
            <h2>LiveD'Wine</h2>
            <nav className="menu">
              <Link to="/">Home</Link>
              <Link to="/about">Sobre</Link>
            </nav>
          </div>
          <div className="content">{children}</div>
          <div className="footer">
            <span>Copyright 2019 - Live D Wine</span>
          </div>
        </div>
      </>
    );
  }
}
