import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      users: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      loading: true,
    });
    const gotUser = await getUser();
    this.setState({
      users: gotUser,
      loading: false,
    });
  }

  render() {
    const { loading, users: { image, name, email, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading />}
        <div>
          <div>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">
              <button className="btn btn-info" type="button">Editar perfil</button>
            </Link>
          </div>
          <section>
            <h4>Nome</h4>
            <p>{ name }</p>
            <h4>E-mail</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
