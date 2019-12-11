import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cards from "react-credit-cards";
import { Calendar, Form, Input, Tabs, Icon, Row, Col } from "antd";
import "./styles.css";
import "react-credit-cards/es/styles-compiled.css";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { TabPane } = Tabs;
// import { Container } from './styles';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      hour: [
        {
          id: 1,
          start: "9:30",
          end: "10:30"
        },
        {
          id: 2,
          start: "11:00",
          end: "12:00"
        },
        {
          id: 3,
          start: "12:30",
          end: "13:30"
        },
        {
          id: 4,
          start: "14:00",
          end: "15:00"
        },
        {
          id: 5,
          start: "15:30",
          end: "16:30"
        },
        {
          id: 6,
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

  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { hour } = this.state;
    return (
      <div className="agendamento-container">
        <Row gutter={{ xs: 0, md: 2, lg: 2, xl: 16 }}>
          <Col xs={24} md={24}>
            <div className="field-label">Selecione a data</div>
            <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
          </Col>
          <Col xs={24} md={24}>
            <div className="field-label" style={{ marginTop: "40px" }}>
              Selecione o horário
            </div>
            <div className="horario">
              <ol>
                {hour.map(item => (
                  <li>
                    {item.start} às {item.end}
                  </li>
                ))}
              </ol>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={24}>
            <div className="field-label">Responda o questionário</div>
            <p>
              Este questionário foi desenvolvido com o objetivo de auxiliar o
              cliente a transmitir para a marca o que deseja, por isso responda
              com atenção e cautela. Vale ressaltar que NÃO copiamos de forma
              alguma modelos de outras marcas, mas sim desenvolvemos um design
              único através de referências enviadas pelo cliente.{" "}
              <span
                className="open-instructions"
                onClick={() => {
                  console.log("abriu");
                }}
              >
                Clique aqui para ver instruções de medição.
              </span>
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item label="Medida do busto em cm(centímetros)">
                    {getFieldDecorator("busto", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Medida do Tórax em cm (centímetros)">
                    {getFieldDecorator("torax", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Medida da Cintura em cm (centímetros)">
                    {getFieldDecorator("cintura", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Qual tamanho usa atualmente para sutiã? Citar a numeração e marca, se
possível. Exemplo:42B Marca UnBoldo"
                  >
                    {getFieldDecorator("sutia", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Possui silicone?">
                    {getFieldDecorator("silicone", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item
                    label="O que mais te incomoda ao comprar a parte de cima de um biquíni (top)?
Conte em detalhes, desde de modelagem, caimento ou até mesmo cores e
estampas"
                  >
                    {getFieldDecorator("incomoda", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Medida do quadril em cm (centímetros)">
                    {getFieldDecorator("quadril", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Baixo quadril em cm (centímetros)">
                    {getFieldDecorator("baixoQuadril", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label="Medidas das coxas em cm (centímetros)">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col xs={24}>
                <Form.Item
                  label="Qual tamanho usa atualmente para a parte de baixo (bottom/calcinha) do
biquíni"
                >
                  {getFieldDecorator("calcinhaAtual", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, preencha esse campo!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label="O que mais te incomoda ao comprar a parte de baixo de um biquíni ?
Conte em detalhes, desde de modelagem, caimento ou até mesmo cores e
estampas"
                >
                  {getFieldDecorator("incomoda", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, preencha esse campo!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label="Nos conte em detalhes o que você espera ter no biquíni, como cor, modelo,
referências, estampas ( caso for o modelo desejado) etc"
                >
                  {getFieldDecorator("detalhes", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, preencha esse campo!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div className="field-label">Informações de pagamento</div>
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const wrapperScheduleForm = Form.create({ name: "questionario" })(Schedule);

export default wrapperScheduleForm;
