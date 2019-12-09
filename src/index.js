import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "antd/es/locale/pt_BR";
import 'moment/locale/pt-br';
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Schedule from "./View/Schedule";
import Home from "./View/Home";
import About from "./View/About";
import Layout from "./View/Layout";
import moment from "moment";

moment.locale('pt-br');

const LayoutHome = () => (
  <Layout>
    <Home />
  </Layout>
);

const LayoutAbout = () => (
  <Layout>
    <About />
  </Layout>
);

const LayoutSchedule = () => (
  <Layout>
    <Schedule />
  </Layout>
);

ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={LayoutHome} />
        <Route path="/agendamento" component={LayoutSchedule} />
        <Route path="/sobre" component={LayoutAbout} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
