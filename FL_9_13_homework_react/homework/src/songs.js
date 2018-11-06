import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      author: this.props.author,
      title: this.props.title,
      isPlaying: false,
    };
  }

  targetFavorite() {
    this.setState(prevstate => ({
      isFavorite: !prevstate.isFavorite,
    }));
  }

  targetPlaying() {
    this.setState(prevstate => ({
      isPlaying: !prevstate.isPlaying,
    }));
  }

  render() {
    const {
      isFavorite, author, title, isPlaying,
    } = this.state;
    return (
      <div role="button" tabIndex={0} className="songs-check" onKeyDown={() => { this.props.updateData(this); }} onClick={() => { this.props.updateData(this); }}>
        <i role="button" tabIndex={0} onKeyDown={this.targetPlaying.bind(this)} onClick={this.targetPlaying.bind(this)} className="material-icons">{ isPlaying ? 'pause' : 'play_arrow' }</i>
        <div className="description">
          <span className="description-title">{ title }</span>
          <span className="description-author">{ author }</span>
        </div>
        <button type="button" onKeyDown={this.targetFavorite.bind(this)} onClick={this.targetFavorite.bind(this)} className={isFavorite ? 'material-icons isFavorite unheart' : 'material-icons isFavorite heart'} title={isFavorite ? 'Unlike it' : 'Like it'}>favorite</button>
      </div>
    );
  }
}

Songs.propTypes = {
  updateData: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export { Songs };
