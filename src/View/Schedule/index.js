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
  Upload,
  Modal,
  Checkbox
} from "antd";
import moment from "moment";
import "./styles.css";
import "react-credit-cards/es/styles-compiled.css";
import { Select } from 'antd';
const { Option } = Select;

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "#fff" }} spin />
);


// import { Container } from './styles';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      measureModalVisible: false,
      policyModalVisible: false,
      dates: [],
      selectedDate: "",
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      hour: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const result = await axios.get(
      `http://unoboldo.kinghost.net/api/calendars`
    );

    const now = moment(new Date()).format("DD/MM/YYYY");
    var selectedDate = result.data.find((element) => element.date === now);

    this.setState(
      {
        dates: result.data
      },
      () => {
        this.setState(
          { 
            isLoading: false,
            selectedDate: selectedDate.date,
            hour: selectedDate.hours,
          });
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

  handleToggleMeasureModal = () => {
    const { measureModalVisible } = this.state;
    this.setState({
      measureModalVisible: !measureModalVisible
    });
  };

  handleTogglePolicyModal = () => {
    const { policyModalVisible } = this.state;
    this.setState({
      policyModalVisible: !policyModalVisible
    });
  };

  handleSubmit = () => {
    console.log(this.props.form.getFieldsValue().attachments.file.thumbUrl);
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const {
      dates,
      hour,
      isLoading,
      measureModalVisible,
      policyModalVisible
    } = this.state;
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
        <Row style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
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

                let hoursSelectedDate;
                dates.forEach(element => {
                  if(element.date === formatDate){
                    hoursSelectedDate = element.hours;
                  }
                });

                this.setState(
                  {
                    selectedDate: formatDate,
                    hour: hoursSelectedDate,
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
                    {item.available && <Button
                      onClick={item => {
                        this.setState({
                          initialHour: item.initialHour
                        });
                      }}
                      
                    >
                      {item.initialHour} às {item.finalHour}
                    </Button>}
                  </li>
                ))}
              </ol>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
          <div className="questionario-container">
            <Col xs={24}>
              <div
                className="field-label"
                style={{
                  color: "rgb(45, 45, 45)",
                  borderBottomColor: "rgb(45, 45, 45)"
                }}
              >
                Responda o questionário
              </div>
              <p>
                Este questionário foi desenvolvido com o objetivo de auxiliar o
                cliente a transmitir para a marca o que deseja, por isso
                responda com atenção e cautela. Vale ressaltar que NÃO copiamos
                de forma alguma modelos de outras marcas, mas sim desenvolvemos
                um design único através de referências enviadas pelo cliente.{" "}
                <span
                  className="open-instructions"
                  onClick={() => this.handleToggleMeasureModal()}
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
          </div>
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
                        maxLength="19"
                        autoComplete="off"
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
                        placeholder="Nome no cartão"
                        autoComplete="off"
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
                        maxLength="8"
                        autoComplete="off"
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
                        maxLength="4"
                        autoComplete="off"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                <Form.Item label="Forma de pagamento">
                    {getFieldDecorator("method", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(<Select 
                          showSearch
                          style={{ borderBottom: "1px solid #fff"}}
                          name="method"
                          placeholder="Selecione a forma de pagamento"
                          >
                        <Option value={1}>Crédito</Option>
                        <Option value={2}>Débito</Option>
                      </Select>)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
          <div className="questionario-container">
            <Col xs={24}>
              <div
                className="field-label"
                style={{
                  color: "rgb(45, 45, 45)",
                  borderBottomColor: "rgb(45, 45, 45)"
                }}
              >
                Dados do cliente
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item label="Nome completo">
                      {getFieldDecorator("fullName", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Email">
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Telefone">
                      {getFieldDecorator("phone", {
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
                    <Form.Item label="Data de nascimento">
                      {getFieldDecorator("birthDate", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Endereço">
                      {getFieldDecorator("address", {
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
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{ marginBottom: "10px" }}
                >
                  <Checkbox onChange={this.handleChangePolicyCheckbox}>
                    Ao agendar um horário você afirma estar de acordo com as
                    nossas políticas.
                    <span
                      className="open-instructions"
                      onClick={() => this.handleTogglePolicyModal()}
                    >
                       Clique aqui para ver nossas políticas
                    </span>
                  </Checkbox>
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <Button className="submit-button" onClick={this.handleSubmit}>
                    Agendar
                  </Button>
                </Row>
              </Form>
            </Col>
          </div>
        </Row>
        <Modal
          title="COMO TIRAR MEDIDAS?"
          visible={measureModalVisible}
          centered
          footer={null}
          onCancel={this.handleToggleMeasureModal}
        >
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <div className="manequim-img-container">
                <img
                  className="manequim-img"
                  alt="Manequim"
                  src="../../assets/images/manequim-medidas.png"
                />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="manequim-text-container">
                <p>
                  <strong>Busto:</strong> Passe a fita métrica sobre a parte
                  mais volumosa dos seios e por baixo dos braços.
                </p>
                <p>
                  <strong>Tórax:</strong> Passe a fita métrica logo abaixo da
                  região dos seios, cortornando pelas costas.
                </p>
                <p>
                  <strong>Cintura:</strong> Contorne sua cintura com a fita
                  métrica, na parte mais fina da silhueta, mais ou menos dois
                  dedos acima do umbigo.
                </p>
                <p>
                  <strong>Baixo Quadril:</strong> Passe a fita métrica onde
                  geralmente se posiciona a linha da calcinha ou por cima do
                  osso mais alto na região da bacia.
                </p>
                <p>
                  <strong>Quadril:</strong> Contorne o quadril na parte mais
                  larga e a mais avantajada dos glutéos.
                </p>
                <p>
                  <strong>Coxas:</strong> Junte as pernas, sem pressionar uma
                  contra a outra, passando a fita métrica na região mediana
                  entre quadril e joelhos.
                </p>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="center">
            <Col>
              <h2
                className="logo-img"
                style={{
                  color: "rgb(45,45,45)",
                  fontSize: "68px",
                  marginTop: "20%"
                }}
              >
                UnBoldo
              </h2>
            </Col>
          </Row>
        </Modal>
        <Modal
          title="COMO FUNCIONA E POLÍTICAS DA EMPRESA"
          visible={policyModalVisible}
          footer={null}
          onCancel={this.handleTogglePolicyModal}
        >
          Teste
        </Modal>
      </div>
    );
  }
}

const wrapperScheduleForm = Form.create({ name: "questionario" })(Schedule);

export default wrapperScheduleForm;
