import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spin, Icon } from "antd";
import "./styles.css";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
// import { Container } from './styles';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wine: {},
      contentBased: [],
      userBased: [],
      loading: true,
      size: 10
    };
  }

  async componentDidMount() {
    const name = window.location.pathname.split("/")[2];
    const resultWine = await axios.get(
      `http://localhost:8080/v1/wines/name/${name}`
    );
    const resultContentBased = await axios.get(
      `http://127.0.0.1:80/v1/recommendations/based-content/wines?wine_key=${name}&size=5`
    );
    const resultUserBased = await axios.get(
      `http://127.0.0.1:80/v1/recommendations/collaborative/wines?wine_key=${name}`
    );
    this.setState({
      contentBased: resultContentBased.data,
      userBased: resultUserBased.data,
      wine: resultWine.data,
      loading: false
    });
  }

  async changeWine() {
    this.setState({
      loading: true
    });
    const name = window.location.pathname.split("/")[2];
    const resultWine = await axios.get(
      `http://localhost:8080/v1/wines/name/${name}`
    );
    const resultContentBased = await axios.get(
      `http://127.0.0.1:80/v1/recommendations/based-content/wines?wine_key=${name}&size=5`
    );
    const resultUserBased = await axios.get(
      `http://127.0.0.1:80/v1/recommendations/collaborative/wines?wine_key=${name}`
    );
    this.setState({
      contentBased: resultContentBased.data,
      userBased: resultUserBased.data,
      wine: resultWine.data,
      loading: false
    });
  }

  shouldComponentUpdate() {
    this.forceUpdate();
    return true;
  }

  loadMoreContent() {
    const { size } = this.state;
    this.setState(
      {
        size: size + 10
      },
      async () => {
        const resultContentBased = await axios.get(
          `http://livedwine-python-api.ngrok.io/v1/recommendations/based-content/wines?wine_key=Anciano Gran Reserva 10 years Valdepeñas D.O. 2007&size=${size}`
        );
        this.setState({
          contentBased: resultContentBased.data
        });
      }
    );
  }

  render() {
    const { contentBased, userBased, loading, wine } = this.state;
    console.log(wine);
    return (
      <div className="detail-container">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div className="detail-content">
            <img
              src={`/images/${wine.id}.png`}
              alt="imagem"
              width="75px"
            />
            <span className="wine-name">{wine.name}</span>
            <div className="wine-details">
              <div className="wine-attributes">
                <div className="attribute">
                  <span>Pais:</span> {wine.country}
                </div>
                <div className="attribute">
                  <span>Região:</span> {wine.region}
                </div>
                <div className="attribute">
                  <span>Produtor:</span> {wine.producer}
                </div>
                <div className="attribute">
                  <span>Safra:</span> {wine.harvest}
                </div>
              </div>
              <div className="wine-attributes">
                <div className="attribute">
                  <span>Tipo de vinho:</span> {wine.type}
                </div>
                <div className="attribute">
                  <span>Volume:</span> {wine.volume}mL
                </div>
                <div className="attribute">
                  <span>Teor alcoolico:</span> {wine.alcoholContent}%
                </div>
              </div>
            </div>
            {wine.grape.length > 0 ||
              (wine.harmonization.length > 0 && (
                <div className="wine-specifies">
                  <div className="wine-attributes">
                    <h3 className="tasty">Paladar: </h3>
                    <div className="attribute">
                      <span>Uva:</span> {wine.grape.join(", ")}
                    </div>
                    <div className="attribute">
                      <span>Harmonização:</span> {wine.harmonization.join(", ")}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {!loading && (
          <>
            <div className="recommended-container">
              <h3 className="recommended-title">Recomendações por conteúdo</h3>
              <ul className="wine-list">
                {contentBased.map(wine => (
                  <li className="wine-item" onClick={() => this.changeWine()}>
                    <Link
                      to={`/wines/${wine.wine_name}`}
                      className="recommended-link"
                    >
                      <div className="item-container">
                        <img
                          src={`/images/${wine.wine_id}.png`}
                          className="recommended-img"
                        />
                        <h5 className="recommended-name">{wine.wine_name}</h5>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="recommended-container">
              <h3 className="recommended-title">Recomendações por usuarios</h3>
              <ul className="wine-list">
                {userBased.map(wine => (
                  <li className="wine-item" onClick={() => this.changeWine()}>
                    <Link
                      to={`/wines/${wine.wine_name}`}
                      className="recommended-link"
                    >
                      <div className="item-container">
                        <img
                          src={`/images/${wine.wine_id}.png`}
                          className="recommended-img"
                        />
                        <h5 className="recommended-name">{wine.wine_name}</h5>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
}
