import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      goToProfile: false,
      name: '',
      email: 'email@test.com',
      image: 'url-to-image',
      description: 'Lorem ipsum',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      loading: true,
    });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleClick = async () => {
    this.setState({
      loading: false,
    });
    const { name, email, image, description } = this.state;
    const profile = {
      name,
      email,
      image,
      description,
    };
    await updateUser(profile);
    this.setState({ goToProfile: true });
  }

  render() {
    const { loading, name, email, image, description, goToProfile } = this.state;
    const ableButtom = image.length > 1 && description !== '' && name !== ''
    && email !== '' && email.split('').includes('@');

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {!loading && <Loading />}
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="edit-input-name"
              type="text"
              onChange={ this.handleChange }
              value={ name }
              id="name"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="edit-input-description"
              type="text"
              onChange={ this.handleChange }
              value={ description }
              id="description"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="edit-input-email"
              type="text"
              onChange={ this.handleChange }
              value={ email }
              id="email"
            />
          </label>
          <label htmlFor="image">
            <input
              data-testid="edit-input-image"
              type="text"
              onChange={ this.handleChange }
              value={ image }
              id="image"
            />
          </label>
          <button
            disabled={ !ableButtom }
            data-testid="edit-button-save"
            type="button"
            onClick={ this.handleClick }
          >
            Enviar
          </button>
        </form>
        {goToProfile && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
