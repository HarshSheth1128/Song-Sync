import React from 'react';
import map from 'lodash/map';
import head from 'lodash/head';

const SubscribedPlayists = ({ subscribedPlaylists, onInfo, onSettings }) => {
  console.log(subscribedPlaylists);

  const handleInfoButtonClick = (playlist) => {
    onInfo(playlist);
  }

  const handleSettingsButtonClick = (playlist, e) => {
    e.stopPropagation();
    onSettings(playlist);
  }

  const renderSubscribedPlaylists = () => {
    return map(subscribedPlaylists, (playlist) => {
      const { name, images, id } = playlist;
      const imageUrl = head(images).url;
      return (
        <div className='subbed-item-container' key={id} onClick={() => handleInfoButtonClick(playlist)}>
          <img className='subbed-item-image' src={imageUrl} />
          <div className='subbed-item-content'>
            <div className='subbed-name-button-container'>
              <div className='item-name'>{name}</div>
              <div className='button-container'>
                <button id="addButton" onClick={(e) => handleSettingsButtonClick(playlist, e)}><i class="fas fa-cog"></i></button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  const renderEmptyContent = () => {
    return (
      <div className="empty-playlists-message">
        <p>No playlists subscribed yet!</p>
        <p>Search for a playlist above and click on the '+' icon and confirm your settings to subscribe to it.</p>
        <p>This playlist will be replicated on your apple music account!</p>
      </div>
    );
  }

  const renderItemContent = () => {
    if (!subscribedPlaylists || subscribedPlaylists.length === 0) {
      return renderEmptyContent();
    } else {
      return renderSubscribedPlaylists();
    }
  }

  return (
    <div className="subbed-items-root">
      <div className="subscribed-playlist-row">
        <span className="tracks-title-label">Subscribed Playlists</span>
        <button className="sync-all-button">Sync All</button>
      </div>
      {renderItemContent()}
    </div>
  );
}

export default SubscribedPlayists;
