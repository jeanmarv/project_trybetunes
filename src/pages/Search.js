import React from 'react';
import ArtistsCards from '../components/ArtistsCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valueTyped: '',
      bandName: '',
      loading: false,
      bandInfo: '',
      dataReturn: false,
      dataNotReturn: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      bandName: target.value,
      valueTyped: target.value,
    });
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    });
    const { bandName } = this.state;
    const info = await searchAlbumsAPI(bandName);
    if (info.length === 0) {
      this.setState({
        dataReturn: false,
        dataNotReturn: true,
        loading: false,
        valueTyped: '',
      });
    } else {
      this.setState({
        bandInfo: info,
        dataReturn: true,
        loading: false,
        dataNotReturn: false,
        valueTyped: '',
      });
    }
  }

  render() {
    const {
      bandInfo,
      loading,
      dataReturn,
      dataNotReturn,
      bandName,
      valueTyped } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-name">
            <input
              type="text"
              value={ valueTyped }
              id="search-name"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ valueTyped.length < 2 }
          >
            Pesquisar
          </button>
        </form>
        {loading && <Loading />}
        {dataNotReturn && <p>Nenhum álbum foi encontrado</p>}
        {dataReturn && <ArtistsCards bandInfo={ bandInfo } bandName={ bandName } />}
      </div>
    );
  }
}

export default Search;
