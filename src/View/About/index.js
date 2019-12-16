import React, { Component } from "react";

import "./styles.css";
import { Col, Row } from "antd";

export default class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div className="field-label">A marca</div>
        <p>
          &nbsp;A UnBoldo nasceu com o objetivo de inovar o mercado de
          beachwear, criando peças únicas (un) para cada cliente. Italiano, o
          sobrenome Boldo traz consigo o amor pela moda e pelo exclusivo.
        </p>
        <img
          alt="Boldo Italia"
          src="../../../assets/images/boldo-italia.JPG"
          style={{
            width: "230px",
            marginTop: "10px",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        />
        <p>
          &nbsp;A ideia da marca surgiu e começou a criar forma em 2017, quando
          sua fundadora, Taynara Boldo, observou um certo padrão no mercado de
          beachwear, e decidiu fazer diferente!
        </p>
        <p>
          &nbsp;Notou que ela e as pessoas a sua volta sentiam certa dificuldade
          ao comprar biquínis e maiôs - tanto nas marcas convencionais quanto
          nas de alto padrão. O caimento não era o ideal, a estampa não a
          agradava e passava por situações como investir em uma peça, chegar na
          praia e encontrar várias pessoas com um modelo como o seu!
        </p>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <div className="img-container">
              <img
                className="img-class"
                alt="Tay Tower"
                src="../../../assets/images/tay-tower.jpg"
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="img-container">
              <img
                className="img-class"
                alt="Tay Tower"
                src="../../../assets/images/sketches.jpg"
              />
            </div>
          </Col>
        </Row>
        <p style={{ marginTop: "10px" }}>
          &nbsp;Taynara passou então um ano em Portugal, pesquisando e
          explorando a moda europeia, aperfeiçoando sua ideia cada dia mais e
          pensando em cada detalhe e diferencial.&nbsp;No entanto, sabia que a
          ideia ainda precisava amadurecer e o conceito ser mais explorado. Na
          época, a UnBoldo ainda não estava na sua forma final e ideal.
        </p>
        <p>
          &nbsp;Quando regressou ao Brasil e apresentou a ideia para a mãe,
          Luciana, entendeu que a pesquisa só havia começado, precisava
          concretizar algo que talvez parecesse inatingível na época. &nbsp;Cada
          etapa do planejamento precisava ser minuciosamente pensada, a fim de
          trazer ao cliente uma experiência perfeita - o que era sua maior
          preocupação.
        </p>
        <p>
          Foram entender profundamente o mercado e como ele funcionava - naquele
          momento, um mundo completamente novo para as duas.
        </p>
      </div>
    );
  }
}
