import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: '',
    };
  }

  handleHeader = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user,
    });
  }

  render() {
    this.handleHeader();
    const { loading, usuario } = this.state;
    return (
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          { !loading ? usuario.name : <Loading />}
        </h3>
        <Link to="/search" data-testid="link-to-search">
          PESQUISA
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          FAVORITOS
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          PROFILE
        </Link>
      </header>
    );
  }
}

export default Header;
