import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      getAlbum: '',
      getBand: '',
      getImage: '',
      getAll: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      getAlbum: musics[0].collectionName,
      getBand: musics[0].artistName,
      getImage: musics[0].artworkUrl100,
      getAll: [...musics],
    });
  }

  render() {
    const { getAlbum, getBand, getAll, getImage } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{`${getBand}`}</p>
        <p data-testid="album-name">{`${getAlbum}`}</p>
        <img src={ getImage } alt={ `Album: ${getAlbum}` } />
        { getAll.slice(1)
          .map((music, index) => <MusicCard music={ music } key={ index } />) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
