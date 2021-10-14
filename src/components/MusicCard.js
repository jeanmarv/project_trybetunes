import React from 'react';
import PropTypes, { objectOf } from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.recoverFavoriteSongs();
  }

  handleChange = async (event) => {
    console.log(event.target.checked);
    console.log(event.target.id);
    this.setState({
      loading: true,
    });
    if (event.target.checked) {
      await addSong(event.target.id);
      console.log('funcionou');
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(event.target.id);
      console.log('tambem funcionou');
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  recoverFavoriteSongs = async () => {
    const { music } = this.props;
    const favorited = await getFavoriteSongs();
    const checkFavorited = favorited.some(
      (musicFav) => music.trackId === musicFav.trackId,
    );
    if (checkFavorited) {
      this.setState({ checked: true });
    }
  }

  render() {
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { loading, checked } = this.state;

    return (
      <div>
        {loading && <Loading />}
        <div>
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              checked={ checked }
              onChange={ this.handleChange }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(
    objectOf({
      previewUrl: PropTypes.string,
      trackName: PropTypes.string,
      trackId: PropTypes.string,
    }),
  ).isRequired,

};
// tive q trocar o lugar do map, conforme luandersson me orientou. musiccard só renderiza o objeto agora.
export default MusicCard;
