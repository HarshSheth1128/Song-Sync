import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import head from 'lodash/head';
import each from 'lodash/each';
import map from 'lodash/map';
const axios = require('axios');

const PlaylistInfo = ({ selectedPlaylist }) => {
  selectedPlaylist = selectedPlaylist.playlist;
  const { name, images, id, owner, description, tracks } = selectedPlaylist;
  let tracksURL = tracks.href;
  const madeBy = owner.display_name;
  const imageUrl = head(images).url;
  const [playlistTracks, setPlaylistTracks] = useState(null);
  const [cookies] = useCookies();

  useEffect(() => {
    fetchTracks();
  }, [selectedPlaylist]);

  const fetchTracks = () => {
    const { SpotifyBearer } = cookies;
    tracksURL.replace(/limit=100/, 'limit=10');
    axios.get(tracksURL, {
      params: {
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${SpotifyBearer}`
      }
    }).then((res) => {
      setPlaylistTracks(res.data.items);
    });
  }

  const renderTracks = () => {
    console.log(playlistTracks);
    const calcMinute = (ms) => Math.floor(ms / 60000);
    const calcSeconds = (ms) => {
      const seconds = Math.floor((ms % 60000) / 1000);
      return (seconds < 10) ? `0${seconds}` : seconds;
    };
    return map(playlistTracks, (playlistTrack, index) => {
      const { track } = playlistTrack;
      const { name, duration_ms, artists, album, explicit } = track;
      console.log(track);
      const primaryArtist = head(artists).name;
      const albumName = album.name;
      return (
        <div className="playlist-track" key={index}>
          <div className="number-container">
            <span>{index + 1}.</span>
          </div>
          <div className="info-container">
            <span className="title">{name}</span>
            <div className="bottom-row">
              <span className="bottom-row-content">{primaryArtist}</span>
              <span className="bottom-row-content"> - </span>
              <span className="bottom-row-content">{albumName}</span>
            </div>
          </div>
          <div className="time-container">
            {explicit &&
              <div className="explicit-container">
                E
              </div>
            }
            <span>{`${calcMinute(duration_ms)}:${calcSeconds(duration_ms)}`}</span>
          </div>
        </div>
      );
    });
  }

  const formatDescription = (description) => {
    return description.replace(/&#x27;/g, '\'');
  }

  const renderPlaylistInfo = () => {
    return (
      <>
        <div className="playlist-title">
          {name}
        </div>
        <div className="playlist-info">
          <div className="playlist-info-image">
            <img className="playlist-image" src={imageUrl} />
          </div>
          <div className="playlist-info-meta">
            <div className="playlist-by"><span className="meta-label">Playlist By:</span><span className="meta-content">{madeBy}</span></div>
            <span className="meta-label">Description:</span><span className="meta-content">{formatDescription(description)}</span>
          </div>
        </div>
        <div className="playlist-tracks">
          <span className="tracks-title-label">Tracks</span>
          {renderTracks()}
        </div>
      </>
    );
  }

  return (
    <div className="content-container">
      {renderPlaylistInfo()}
    </div>
  );
};

export default PlaylistInfo;