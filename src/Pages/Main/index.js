import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    load: false,
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ load: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      load: false,
    });
  }

  render ( ) {
    const { newRepo, load } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt/>
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton load={load}>
            { load ? (
              <FaSpinner color="#FFF" size={14}/>
            ) : (
              <FaPlus color="#FFF" size={14}/>
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default Main;