import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArtistsCards extends React.Component {
  render() {
    const { bandName, bandInfo } = this.props;
    return (
      <div>
        <p>
          {`Resultado de álbuns de: ${bandName}`}
        </p>
        {bandInfo.map(({ collectionId, artworkUrl100, collectionName, artistName }) => (
          <>
            <Link
              to={ `/album/${collectionId}` }
              data-testid={ `link-to-album-${collectionId}` }
            >
              Link para o album
            </Link>
            <img src={ artworkUrl100 } alt="Album Cover" />
            <p>{ collectionName }</p>
            <p>{ artistName }</p>
          </>
        ))}
      </div>
    );
  }
}

ArtistsCards.propTypes = {
  bandInfo: PropTypes.array,
}.isRequired;

export default ArtistsCards;
