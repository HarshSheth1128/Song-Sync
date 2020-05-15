import React, { useState } from 'react';
import SearchBar from '../../common/components/SearchBar';
import InfoSection from '../../common/components/InfoSection';
import SubscribedPlayists from '../../common/components/SubscribedPlaylists';
import Toast from '../../common/components/Toast';
import { useEffect } from 'react';

const axios = require('axios');

const MainPage = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showSubscribedPlaylistToast, setShowSubscribedPlaylistToast] = useState(false);
  const [subscribedPlaylists, setSubscribedPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4001/playlists/1`).then((res) => {
      setSubscribedPlaylists(res.data);
    })
  }, []);

  const addPlaylist = (playlist) => {

  }

  const onPlaylistInfoClick = (playlist) => {
    setSelectedPlaylist({ view: 'INFO', playlist });
  }

  const onPlaylistSettingsClick = (playlist) => {
    setSelectedPlaylist({ view: 'SETTINGS', playlist });
  }

  const onPlaylistAddClick = (playlist) => {
    if (subscribedPlaylists !== null) {
      setSubscribedPlaylists([
        ...subscribedPlaylists,
        playlist
      ]);
    } else {
      setSubscribedPlaylists([playlist]);
    }
    setShowSubscribedPlaylistToast(true);
    setTimeout(() => {
      setShowSubscribedPlaylistToast(false);
    }, 5000);


    const { id, } = playlist;

    axios.post(`http://localhost:4001/playlists/${localStorage.getItem('userID')}`, {
      spotifyID: id,
      userID: localStorage.getItem('userID'),
      targetName: 'test',
      includeExplicit: 1,
      syncRegularity: 'Daily'
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="main-page-root">
      <Toast
        show={showSubscribedPlaylistToast}
        title={"Subscribed to playlist"}
        onClose={() => setShowSubscribedPlaylistToast(false)}>
        <span>You subscribed to the playlist</span>
      </Toast>
      <div className="left-container">
        <div className="left-content-container">
          <div className="search-container">
            <SearchBar
              onInfo={onPlaylistInfoClick}
              onAdd={onPlaylistAddClick}
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen} />
          </div>
          <div className="item-container">
            <SubscribedPlayists
              onInfo={onPlaylistInfoClick}
              onSettings={onPlaylistSettingsClick}
              subscribedPlaylists={subscribedPlaylists} />
          </div>
        </div>
      </div>
      <div className="right-container">
        <InfoSection
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          selectedPlaylist={selectedPlaylist} />
      </div>
    </div>
  );
}

export default MainPage;