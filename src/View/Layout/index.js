import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import "./styles.css";

// import { Container } from './styles';

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <div className="container">
          <header className="header">
            <Row type="flex" justify="center" align="middle">
              <Col className="header-col" xs={24} md={24} lg={6}>
                <h2 className="logo-img">UnBoldo</h2>
              </Col>
              <Col className="header-col-menu" xs={24} md={24} lg={12}>
                <nav className="menu">
                  <Link to="/" style={{ marginRight: "30px" }}>
                    Home
                  </Link>
                  <Link to="/agendamento" style={{ marginRight: "30px" }}>
                    Agendamento
                  </Link>
                  <Link to="/sobre" style={{ marginRight: "30px" }}>
                    Sobre
                  </Link>
                  <Link to="/contato">Contato</Link>
                </nav>
              </Col>
              <Col xs={24} lg={6} />
            </Row>
          </header>
          <div className="content">{children}</div>
          <div className="footer">
            <span>Copyright 2019 - Live D Wine</span>
          </div>
        </div>
      </>
    );
  }
}
