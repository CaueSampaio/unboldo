import React, { Component } from "react";
import axios from "axios";
import { Spin, Icon } from "antd";

import "./styles.css";
// import { Container } from './styles';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wines: [],
      loading: true
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      "http://livedwine-java-api.ngrok.io/v1/wines"
    );
    console.log(response);
    this.setState({
      wines: response.data.content,
      loading: false
    });
  }

  render() {
    const { loading, wines } = this.state;
    return (
      <div className="home-container">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div className="wines.container">
            {wines.map(wine => (
              <div>{wine.name}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
