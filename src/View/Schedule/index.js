import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cards from "react-credit-cards";
import {
  Button,
  Calendar,
  Form,
  Input,
  Icon,
  Row,
  Col,
  message,
  Upload
} from "antd";
import moment from "moment";
import "./styles.css";
import "react-credit-cards/es/styles-compiled.css";

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "#fff" }} spin />
);
// import { Container } from './styles';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      selectedDate: "",
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
      ],
      isLoading: true
    };
  }

  async componentDidMount() {
    const result = await axios.get(
      `http://unoboldo.kinghost.net/api/calendars`
    );
    this.setState(
      {
        dates: result.data
      },
      () => {
        this.setState({ isLoading: false });
      }
    );
  }

  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = e => {
    const { id, value } = e.target;
    const fieldArray = id.split("_");
    const field = fieldArray[fieldArray.length - 1];
    this.setState({ [field]: value }, () => console.log(this.state));
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { dates, hour, isLoading } = this.state;
    const props = {
      name: "file",
      multiple: true,
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      listType: "picture",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} arquivo enviado com sucesso.`);
        } else if (status === "error") {
          message.error(`${info.file.name} erro ao enviar o arquivo.`);
        }
      }
    };
    console.log(this.state);
    return (
      <div className="agendamento-container">
        <Row gutter={{ xs: 0, md: 2, lg: 2, xl: 16 }}>
          <Col xs={24} md={24}>
            <div className="field-label">Selecione a data</div>
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(255,255,255,0.0)",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "wait"
                }}
              >
                {antIcon}
              </div>
            )}
            <Calendar
              fullscreen={false}
              onChange={date => {
                const formatDate = moment(date).format("DD/MM/YYYY");
                this.setState(
                  {
                    selectedDate: formatDate
                  },
                  () => {
                    console.log(this.state);
                  }
                );
              }}
              disabledDate={current => {
                if (isLoading) return true;
                const formatDate = moment(current).format("DD/MM/YYYY");
                const isAvailable = dates.find(
                  item => item.date === formatDate && item.available
                );
                return !isAvailable;
              }}
            />
          </Col>
          <Col xs={24} md={24}>
            <div className="field-label" style={{ marginTop: "70px" }}>
              Selecione o horário
            </div>
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(255,255,255,0)",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "wait"
                }}
              >
                {!isLoading ? { antIcon } : null}
              </div>
            )}
            <div className="horario">
              <ol>
                {hour.map(item => (
                  <li>
                    <Button
                      onClick={item => {
                        this.setState({
                          initialHour: item.start
                        });
                        console.log("teste", item);
                      }}
                      disabled={item => {
                        const { dates, selectedDate } = this.state;
                        const selectedDateHours = dates.find(
                          date => date.date === selectedDate
                        );
                        const availableHour = selectedDateHours.hours.some(
                          hour =>
                            hour.initialHour === item.start && hour.available
                        );
                        return availableHour;
                      }}
                    >
                      {item.start} às {item.end}
                    </Button>
                  </li>
                ))}
              </ol>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
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
            <Row gutter={[0, 16]}>
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
                <Form.Item
                  label="Tem imagens de referência? Anexe aqui, isso vai nos ajudar a entender melhor o
que deseja!"
                >
                  {getFieldDecorator("attachments")(
                    <Upload.Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">
                        Clique ou arraste arquivos para anexar.
                      </p>
                      <p className="ant-upload-hint">
                        Envie um ou mais arquivos.
                      </p>
                    </Upload.Dragger>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="field-label" style={{ marginTop: "30px" }}>
          Informações de pagamento
        </div>
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={24} md={12} lg={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "15px 0px"
              }}
            >
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
                locale={{ valid: "validade" }}
                placeholder={{ name: "NOME SOBRENOME" }}
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Form style={{ marginTop: "0px" }}>
              <Row>
                <Col xs={24}>
                  <Form.Item label="Número do cartão">
                    {getFieldDecorator("number", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(
                      <input
                        type="text"
                        name="number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                        data-mask="0000 0000 0000 0000"
                        maxlength="19"
                        autocomplete="off"
                      ></input>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Nome">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nome Sobrenome"
                        autocomplete="off"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item style={{ marginRight: "10px" }} label="Validade">
                    {getFieldDecorator("expiry", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(
                      <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        placeholder="MM/AA"
                        data-mask="00/00"
                        maxlength="8"
                        autocomplete="off"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="CVC">
                    {getFieldDecorator("cvc", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(
                      <input
                        type="text"
                        name="cvc"
                        className="form-control"
                        placeholder="000"
                        maxlength="4"
                        autocomplete="off"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Button className="submit-button" type="submit">
            Agendar
          </Button>
        </Row>
      </div>
    );
  }
}

const wrapperScheduleForm = Form.create({ name: "questionario" })(Schedule);

export default wrapperScheduleForm;
