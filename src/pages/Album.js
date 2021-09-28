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
      getAll: '',
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
      getAll: musics,
    });
    console.log(musics);
  }

  render() {
    const { getAlbum, getBand, getAll } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{`${getBand}`}</p>
        <p data-testid="album-name">{`${getAlbum}`}</p>
        <MusicCard getAll={ getAll } />
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
