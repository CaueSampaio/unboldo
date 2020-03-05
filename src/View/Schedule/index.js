import React, { Component } from "react";
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
import MaskedInput from 'antd-mask-input';
import "react-credit-cards/es/styles-compiled.css";
import { Select } from 'antd';
const { Option } = Select;

const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "#fff" }} spin />
);

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
      isLoading: true,
      photos: [],
      finalHour: null,
      initialHour: null,
      submitLoading: null,
      policyTermsAceppted: false,
      method: null,
    };
  }

  async componentDidMount() {
    const result = await axios.get(
      `http://unoboldo.kinghost.net/api/calendars`
    );

    let now = moment(new Date()).format("DD/MM/YYYY");
    var selectedDate = result.data.find((element) => element.date === now);
    
      

    this.setState(
      {
        dates: result.data
      },
      () => {
        this.setState(
          { 
            isLoading: false,
            selectedDate: selectedDate.available ? selectedDate.date : null,
            hour: selectedDate.available ? selectedDate.hours : null,
          });
      }
    );
  }

  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleChangePolicyCheckbox = e => {
    const { policyTermsAceppted } = this.state;    
    this.setState({policyTermsAceppted: !policyTermsAceppted});
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

  handleSubmit = (e) => {
    const { method, policyTermsAceppted, selectedDate, initialHour, finalHour, number, cvc, expiry } = this.state;
    this.setState({ submitLoading: true });

    // validate fields
    let canContinue = true;
    this.props.form.validateFields((err, value) => {
      if(err !== null) {
        canContinue = false;
      }
    });
    if(initialHour === null){
      canContinue = false;
      alert('Informe dia e hora do seu agendamento!');
    }
    if(policyTermsAceppted === false){
      canContinue = false;
      alert("Você precisa estar de acordo com nossas políticas para continuar com o agendamento.");
    }
    if(!canContinue){
      this.setState({submitLoading: false});
      return;
    }
    

    // Pegar base64 dos arquivos enviados, photos.reference
    const { photos } = this.state;
    const fields = this.props.form.getFieldsValue();

    const submitLoadingToFalse = () => {
      this.setState({submitLoading: false});
    };
    window.PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      
      // Fazer a request 
      const instance = axios.create({
        baseURL: 'http://unoboldo.kinghost.net/api/',
        headers: {'X-Custom-Header': 'foobar'},
        validateStatus: function (status) {
          return status < 500; // default
        }
      });
      const questionnaires = [];
      questionnaires.push({ question: "Medida do busto em cm(centímetros)", answer: fields.q1 })
      questionnaires.push({ question: "Medida do Tórax em cm (centímetros)", answer: fields.q2 })
      questionnaires.push({ question: "Medida da Cintura em cm (centímetros)", answer: fields.q3 })
      questionnaires.push({ question: "Qual tamanho usa atualmente para sutiã? Citar a numeração e marca, se possível. Exemplo:42B Marca UnBoldo", answer: fields.q4 })
      questionnaires.push({ question: "Possui silicone?", answer: fields.q5 })
      questionnaires.push({ question: "O que mais te incomoda ao comprar a parte de cima de um biquíni (top)? Conte em detalhes, desde de modelagem, caimento ou até mesmo cores e estampas", answer: fields.q6 })
      questionnaires.push({ question: "Medida do quadril em cm (centímetros)", answer: fields.q7 })
      questionnaires.push({ question: "Baixo quadril em cm (centímetros)", answer: fields.q8 })
      questionnaires.push({ question: "Medidas das coxas em cm (centímetros)", answer: fields.q9 })
      questionnaires.push({ question: "Qual tamanho usa atualmente para a parte de baixo (bottom/calcinha) do biquíni", answer: fields.q10 })
      questionnaires.push({ question: "O que mais te incomoda ao comprar a parte de baixo de um biquíni ? Conte em detalhes, desde de modelagem, caimento ou até mesmo cores e estampas", answer: fields.q11 })
      questionnaires.push({ question: "Nos conte em detalhes o que você espera ter no biquíni, como cor, modelo, referências, estampas ( caso for o modelo desejado) etc", answer: fields.q12 })

      let paymentData = {
        method: 1,
        senderHash: response.senderHash,
        cardNumber: number.replace(" ","").replace(" ","").replace(" ",""),
        CardCVV: cvc,
        CardExpirationMonth: expiry.substr(0,2),
        CardExpirationYear: "20" + expiry.substr(3,2),
        AddressStreet: fields.addressStreet,
        addressNumber: fields.addressNumber,
        addressDistrict: fields.addressDistrict,
        addressPostalCode: fields.addressPostalCode,
        addressCity: fields.addressCity,
        addressState: fields.addressState,
      }
      
      instance.post('schedules',
      {
        // ...fields,
        photos,
        date: selectedDate,
        initialHour,
        finalHour,
        questionnaires,
        client: {
          name: fields.name,
          cpf: fields.cpf,
          email: fields.email,
          birthDate: fields.birthDate,
          phoneNumber:fields.phoneNumber,
          paymentData,
        }
      })
      .then(function (response) {
        console.log("response", response);
        if(response.status === 200)
          alert("Seu agendamento foi realizado com sucesso!");
        else if(response.status === 422)
          alert(response.data.error);
        else 
          alert("Ocorreu um erro, tente novamente mais tarde.");

        submitLoadingToFalse();
      })
      .catch(function (error) {
        alert("Ocorreu um erro, tente novamente mais tarde.");
        submitLoadingToFalse();
      });
      

    });
    
  };


  addPhoto = (base64) => {
    const { photos } = this.state;
    this.setState({
      photos: photos.concat({ reference: base64})
    })
  };

  inputDateValidator = (rule, value, callback) => {
    console.log("inputDateValidator");
    try{
      const date = moment(value, "DD/MM/YYYY", true);
      if(date.isValid())
      {
        console.log("moment.now()",moment.now());
        if(date < moment.now())
          callback();
      }
      callback("Data Inválida.");
    }
    catch(e){
      callback("Data Inválida.");
    }
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
      policyModalVisible,
      submitLoading,
      method,
    } = this.state;
    const props = {
      name: "file",
      multiple: true,
      transformFile: (file) => {        
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          let result = undefined;
          reader.onload = () => {
            result = reader.result;
            this.addPhoto(result);
            const canvas = document.createElement('canvas');
            const img = document.createElement('img');
            img.src = reader.result;
            img.onload = () => {
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              ctx.fillStyle = 'red';
              ctx.textBaseline = 'middle';
              ctx.fillText('Ant Design', 20, 20);
              canvas.toBlob(resolve);
            };
          };
          
        });
      },
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
                console.log("O Calendário está mudando", date);
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
                {(hour === undefined || hour === null || hour.length == 0) ? (<p>Nenhum horário disponível para esse dia.</p>) : hour.map(item => (
                  <li>
                    {item.available && <Button
                      onClick={(e) => {
                        this.setState({
                          initialHour: item.initialHour,
                          finalHour: item.finalHour,
                        });
                        console.log("item",item);
                      }}>
                      {item.initialHour} às {item.finalHour}
                    </Button>}
                  </li>
                ))}
                {}
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
                      {getFieldDecorator("q1", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Medida do Tórax em cm (centímetros)">
                      {getFieldDecorator("q2", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Medida da Cintura em cm (centímetros)">
                      {getFieldDecorator("q3", {
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
                      {getFieldDecorator("q4", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Possui silicone?">
                      {getFieldDecorator("q5", {
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
                      {getFieldDecorator("q6", {
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
                      {getFieldDecorator("q7", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Baixo quadril em cm (centímetros)">
                      {getFieldDecorator("q8", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Medidas das coxas em cm (centímetros)">
                      {getFieldDecorator("q9", {
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
                    {getFieldDecorator("q10", {
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
                    {getFieldDecorator("q11", {
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
                    {getFieldDecorator("q12", {
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
        
           <div
          //  style={{
          //       display: "flex",
          //       justifyContent: "center",
          //       alignItems: "center",
          //       margin: "15px 0px"
          //     }}
          style={{
            display: "block",
            margin: "15px auto",
            width: '80%'
          }}
              >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "40px 0px 0px"
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
                    {getFieldDecorator("cardName", {
                      rules: [
                        {
                          required: true,
                          message: "Por favor, preencha esse campo!"
                        }
                      ]
                    })(
                      <input
                        type="text"
                        name="cardName"
                        className="form-control"
                        placeholder="Nome no cartão"
                        autoComplete="off"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24}>
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
                        placeholder="CVV"
                        maxLength="4"
                        autoComplete="off"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    )}
                  </Form.Item>
                </Col>
                
              </Row>
            </Form></div>
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
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="CPF">
                      {getFieldDecorator("cpf", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          },
                          {
                            min:11,
                            max:11,
                            message: "CPF deve conter 11 caracteres."
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          },
                          {
                            type: 'email',
                            message: 'E-mail inválido.'
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Telefone">
                      {getFieldDecorator("phoneNumber", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          },
                          {
                            min:10,
                            max: 11,
                            message: "Telefone deve conter no mínimo 10 e no máximo 11 caracteres."
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
                          },
                          {
                            min: 10,
                            max:11,
                            message: "Data inválida",
                          },
                          {
                            validator: this.inputDateValidator,
                          }
                        ]
                      })(<MaskedInput mask="11/11/1111" />)}
                    </Form.Item>
                    <Form.Item label="Rua">
                      {getFieldDecorator("addressStreet", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Número">
                      {getFieldDecorator("addressNumber", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Bairro">
                      {getFieldDecorator("addressDistrict", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="CEP">
                      {getFieldDecorator("addressPostalCode", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          },
                          {
                            min: 8,
                            max: 8,
                            message: "Cep inválido.",
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Cidade">
                      {getFieldDecorator("addressCity", {
                        rules: [
                          {
                            required: true,
                            message: "Por favor, preencha esse campo!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Estado">
                      {getFieldDecorator("addressState", {
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
                  <Button loading={submitLoading} className="submit-button" onClick={this.handleSubmit}>
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
