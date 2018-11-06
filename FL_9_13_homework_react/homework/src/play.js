import React, { Component } from 'react';
import { SongsList } from './songs-list';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTrack = this.getSongs.bind(this);
  }

  getSongs(value) {
    const {
      author, mp3, poster, title,
    } = value;
    this.setState({
      author,
      mp3,
      poster,
      title,
    });
  }

  render() {
    const {
      author, mp3, poster, title,
    } = this.state;
    return (
      <div className="container">
        <div>
          <h2>Now playing</h2>
          <div className="player">
            <audio autoPlay src={mp3} />
            <div className="player__items">
              <img src={poster} alt="Album cover" />
              <div className="player__items_author">{author}</div>
              <div className="name">{title}</div>
            </div>
            <div className="control-panel">
              <div className="control-panel__view">
                <div className="control-panel__view-line" />
              </div>
              <div className="buttons">
                <i className="material-icons prev">skip_previous</i>
                <i className="material-icons stop">play_arrow</i>
                <i className="material-icons next">skip_next</i>
              </div>
            </div>
          </div>
        </div>
        <SongsList getSongs={this.getSongs} />
      </div>
    );
  }
}


export { Play };
