import React from 'react';
import PropTypes, { objectOf } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { getAll } = this.props;
    const allLista = [...getAll];
    allLista.shift();
    return (
      <div>
        {allLista.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  getAll: PropTypes.arrayOf(
    objectOf({
      previewUrl: PropTypes.string,
      trackName: PropTypes.string,
      trackId: PropTypes.string,
    }),
  ).isRequired,
};

export default MusicCard;
