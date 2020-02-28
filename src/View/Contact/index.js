import React, { Component } from "react";
import { Col, Form, Input, Row } from "antd";
import "./styles.less";

class Contact extends Component {
  handleSubmit = () => {
    const {
      form: { getFieldsValue }
    } = this.props;
    console.log(getFieldsValue());
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className="contact-container">
        <Row style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Col xs={24}>
            <div className="field-label">Contato</div>
          </Col>
        </Row>
        <Row style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Assunto">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Por favor, preencha esse campo!"
                  }
                ]
              })(<Input className="teste" />)}
            </Form.Item>
            <Form.Item label="Mensagem">
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "Por favor, preencha esse campo!"
                  }
                ]
              })(<Input.TextArea className="teste" rows={4} />)}
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}

const wrapperContactForm = Form.create({ name: "contact" })(Contact);

export default wrapperContactForm;
