import React, { Component } from "react";
import axios from "axios";
import { Spin, Icon } from "antd";
import { Link } from "react-router-dom";

import "./styles.css";
// import { Container } from './styles';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin={true} />;
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wines: [],
      loading: true,
      page: 0,
      loadMore: false
    };
  }

  async componentDidMount() {
    const { page } = this.state;
    const response = await axios.get(
      `http://localhost:8080/v1/wines?size=12&page=${page}`
    );
    console.log(response);
    this.setState({
      wines: response.data.content,
      loading: false
    });
  }

  loadMore() {
    const { page, wines } = this.state;
    this.setState(
      {
        page: page + 1,
        loadMore: true
      },
      async () => {
        const response = await axios.get(
          `http://localhost:8080/v1/wines?size=12&page=${page}`
        );
        const {
          data: { content }
        } = response;
        this.setState({
          wines: wines.concat(content),
          loadMore: false
        });
      }
    );
  }

  render() {
    const { loading, wines, loadMore } = this.state;
    return (
      <div className="home-container">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div className="wines-container">
            {wines.map(wine => (
              <Link to={`wines/${wine.name}`} className="wines-content">
                <div className="wine-img" />
                <div className="wine-footer">
                  <h3>{wine.name}</h3>
                  <h4>
                    <i class="fas fa-globe-americas"></i> {wine.country}
                  </h4>
                  <h4>
                    <i class="fas fa-map"></i> {wine.region}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!loading && (
          <button className="load-more" onClick={() => this.loadMore()}>
            {loadMore ? <Spin indicator={antIcon} /> : "Carregar mais"}
          </button>
        )}
      </div>
    );
  }
}

export default Home;
