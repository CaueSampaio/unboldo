import React, { Component } from "react";

// import { Container } from './styles';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wines: [],
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2000);
  }

  render() {
    const { loading } = this.state;
    return <div>{loading ? <p>Carregando...</p> : <h1>Tela Home</h1>}</div>;
  }
}

export default Home;
