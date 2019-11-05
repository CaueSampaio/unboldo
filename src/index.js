import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import DetailPage from "./View/DetailPage";
import Home from "./View/Home";
import About from "./View/About";
import Layout from "./View/Layout";

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

const LayoutDetail = () => (
  <Layout>
    <DetailPage />
  </Layout>
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={LayoutHome} />
      <Route path="/about" component={LayoutAbout} />
      <Route path="/wines/:wineId" component={LayoutDetail} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
