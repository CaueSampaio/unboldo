import React, { Component } from "react";
import { Col, Form, Input, Row, Button } from "antd";
import "./styles.less";
import axios from "axios";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
    }
  }

  handleSubmit = () => {
    this.setState({submitLoading: true});

    const {
      form: { getFieldsValue, validateFields }
    } = this.props;

    const submitLoadingToFalse = () => {
      this.setState({submitLoading: false});
    };

    let canContinue = true;
    validateFields((err, value) => {
      if(err !== null) {
        canContinue = false;
      }
    });
    if(!canContinue){
      submitLoadingToFalse();
      return;
    }

    const instance = axios.create({
      baseURL: 'http://unoboldo.kinghost.net/api/',
      headers: {'X-Custom-Header': 'foobar'},
      validateStatus: function (status) {
        return status < 500; // default
      }
    });

    const fields = getFieldsValue();
    instance.post('contacts', 
      {
        name: fields.name,
        email: fields.email,
        message: fields.message, 
      })
      .then((response) => {
        if(response.status === 200)
          alert("Sua mensagem foi enviada com sucesso!");
        else if(response.status === 422)
          alert(response.data.error);
        else 
          alert("Ocorreu um erro, tente novamente mais tarde.");

        submitLoadingToFalse();
      })
      .catch((error) => {
        alert("Ocorreu um erro, tente novamente mais tarde.");
        submitLoadingToFalse();
      });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { submitLoading } = this.state;
    return (
      <div className="contact-container">
        <Row style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Col xs={24}>
            <div className="field-label">Contato</div>
          </Col>
        </Row>
        <Row style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Nome">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Por favor, preencha esse campo!"
                  }
                ]
              })(<Input placeholder="Nome" className="teste" style={{color: 'white'}} />)}
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
              })(<Input placeholder="E-mail" className="teste" style={{color: 'white'}} />)}
            </Form.Item>
            <Form.Item label="Mensagem">
              {getFieldDecorator("message", {
                rules: [
                  {
                    required: true,
                    message: "Por favor, preencha esse campo!"
                  }
                ]
              })(<Input.TextArea placeholder="Mensagem" className="teste" rows={4} style={{color: 'white'}} />)}
            </Form.Item>
            <div style={{display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}>
              <Button loading={submitLoading} className="submit-button" onClick={this.handleSubmit}>
                Enviar
              </Button>
            </div>
          </Form>
        </Row>
      </div>
    );
  }
}

const wrapperContactForm = Form.create({ name: "contact" })(Contact);

export default wrapperContactForm;
