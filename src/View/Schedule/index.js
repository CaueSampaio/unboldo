import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar, Tabs, Icon, Row, Col } from "antd";
import "./styles.css";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { TabPane } = Tabs;
// import { Container } from './styles';

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: [
        {
          start: "9:30",
          end: "10:30"
        },
        {
          start: "11:00",
          end: "12:00"
        },
        {
          start: "12:30",
          end: "13:30"
        },
        {
          start: "14:00",
          end: "15:00"
        },
        {
          start: "15:30",
          end: "16:30"
        },
        {
          start: "17:00",
          end: "18:00"
        }
      ]
    };
  }

  // async componentDidMount() {
  //   const resultWine = await axios.get(
  //     `http://unoboldo.kinghost.net/api/calendars`
  //   );
  // }

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  render() {
    const { hour } = this.state;
    return (
      <div className="agendamento-container">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Dados" key="1">
            <Row>
              <Col xs={24} md={12} lg={8}>
                <span className="selecione-dia">Selecione um dia</span>
                <Calendar
                  fullscreen={false}
                  onPanelChange={this.onPanelChange}
                />
              </Col>
              <Col xs={24} md={12} lg={8}>
                <span className="selecione-dia">Selecione um horário</span>
                <div className="horario">
                  <ol>
                    {hour.map(item => (
                      <li>
                        {item.start} ~ {item.end}
                      </li>
                    ))}
                  </ol>
                </div>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <span className="selecione-dia">Selecione um dia</span>
                <Calendar
                  fullscreen={false}
                  onPanelChange={this.onPanelChange}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Pagamento" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Concluído" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
