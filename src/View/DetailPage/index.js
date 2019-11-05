import React, { Component } from "react";
import "./styles.css";
// import { Container } from './styles';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wine: {},
      loading: true
    };
  }

  componentDidMount() {
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
      2000
    );
  }

  render() {
    const { loading, wine } = this.state;
    return (
      <div className="detail-container">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="detail-content">
            <img
              src="https://res.cloudinary.com/evino/image/upload/q_auto:good,fl_progressive:steep,f_auto,dpr_1.0,h_640/v1/products/1697090-standing-front.png"
              alt="imagem"
              width="75px"
            />
            <div className="wine-details">
              <span className="wine-name">{wine.name}</span>
              <ul class="wine-attributes">
                <li>
                  <span>Tipo de vinho:</span> {wine.type}
                </li>
                <li>
                  <span>Volume:</span> {wine.volume}mL
                </li>
                <li>
                  <span>Teor alcoolico:</span> {wine.alcoholContent}%
                </li>
                <li>
                  <span>Pais:</span> {wine.country}
                </li>
                <li>
                  <span>Região:</span> {wine.region}
                </li>
                <li>
                  <span>Produtor:</span> {wine.producer}
                </li>
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
      </div>
    );
  }
}
