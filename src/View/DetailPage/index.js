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
      loading: true,
      size: 10
    };
  }

  async componentDidMount() {
    const name = window.location.pathname.split("/")[2];
    const resultWine = await axios.get(
      `http://livedwine-java-api.ngrok.io/v1/wines/name/${name}`
    );
    const resultContentBased = await axios.get(
      "http://livedwine-python-api.ngrok.io/v1/recommendations/based-content/wines?wine_key=Alqueve Branco 2017&size=10"
    );
    console.log("porps", this.props);
    this.setState({
      contentBased: resultContentBased.data,
      wine: resultWine
    });
    setTimeout(
      () =>
        this.setState({
          loading: false,
          wine: {
            id: "4239296B-11A4-4F49-9967-A46D0E27F76B",
            name: "Punta de diablo",
            type: 5,
            country: "Argentina",
            region: "Buenos Aires",
            alcoholContent: "1",
            producer: "caseiro",
            volume: 5,
            grape: "1",
            harvest: "30",
            somelier: "somelier01",
            harmonization: "1",
            categoryId: "1E6505C4-47ED-421F-B6B6-4E68EB2CEF35",
            category: null,
            particulars: null,
            like: true,
            visualization: 1
          }
        }),
      1000
    );
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
    const { contentBased, loading, wine } = this.state;
    return (
      <div className="detail-container">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div className="detail-content">
            <img
              src="https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_640/v1/products/1697090-standing-front.png"
              alt="imagem"
              width="75px"
            />
            <div className="wine-details">
              <span className="wine-name">{wine.name}</span>
              <ul className="wine-attributes">
                <li>
                  <span>Tipo de vinho:</span> {wine.type}
                </li>
                <li>
                  <span>Volume:</span> {wine.volume}mL
                </li>
                <li>
                  <span>Teor alcoolico:</span> {wine.alcoholContent}%
                </li>
              </ul>
              <ul className="wine-attributes">
                <li>
                  <span>Pais:</span> {wine.country}
                </li>
                <li>
                  <span>Região:</span> {wine.region}
                </li>
                <li>
                  <span>Produtor:</span> {wine.producer}
                </li>
              </ul>
              <ul className="wine-attributes">
                <li>
                  <span>Safra:</span> {wine.harvest}
                </li>
                <li>
                  <span>Uva:</span> {wine.grape}
                </li>
                <li>
                  <span>Harmonização:</span> {wine.harmonization}
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="recommended-container">
          <h3 className="recommended-title">Recomendações por conteúdo</h3>
          <ul className="wine-list">
            {contentBased.map(wine => (
              <li className="wine-item">
                <Link to={`/wines/${wine.wine_id}`}>
                  <div className="item-container">
                    <img
                      src="https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_640/v1/products/1697090-standing-front.png"
                      className="recommended-img"
                    />
                    {wine.wine_name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => this.loadMoreContent(10)}>
            Carregar mais
          </button>
        </div>
      </div>
    );
  }
}
