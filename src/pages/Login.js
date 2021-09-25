import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      showButton: true,
      loading: false,
      goToSearch: false,
    };
  }

  handleChange = ({ target }) => {
    if (target.value.length > 2) {
      this.setState({
        name: target.value,
        showButton: false,
      });
    }
  }

  handleButtom = async () => {
    this.setState({
      loading: true,
    });
    const { name } = this.state;
    await createUser({ name });
    this.setState({
      goToSearch: true,
    });
  }

  render() {
    const { showButton, loading, goToSearch } = this.state;
    const forms = (
      <div data-testid="page-login">
        <label htmlFor="imput-name">
          <input
            id="imput-name"
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handleButtom }
          disabled={ showButton }
        >
          Entrar
        </button>
      </div>
    );
    if (goToSearch) {
      return <Redirect to="/search" />;
    }
    return (loading) ? <Loading /> : forms;
  }
}

export default Login;
