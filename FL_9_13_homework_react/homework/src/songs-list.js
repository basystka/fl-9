import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Songs } from './songs';

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      isLoaded: false,
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    fetch('https://fl-homework-api.firebaseio.com/mozart.json')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          tracks: json,
        });
      });
  }

  updateData(value) {
    this.props.getSongs(value);
  }

  render() {
    const { isLoaded, tracks } = this.state;
    if (!isLoaded) {
      return (
        <p>Loading tracks...</p>
      );
    }
    return (
      <div className="songslist">
        <h2>Playlist</h2>
        <ul className="songslist__items">
          {tracks.map(track => (
            <li key={track.id}>
              <Songs updateData={this.updateData} author={track.author} title={track.title} />
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

SongsList.propTypes = {
  getSongs: PropTypes.func.isRequired,
};

export { SongsList };
