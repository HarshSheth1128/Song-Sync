import React from 'react';
import PlaylistInfo from './PlaylistInfo';
import SyncSettings from './SyncSettings';

const InfoSection = ({ searchOpen, selectedPlaylist }) => {
  const renderEmptyInfo = () => {
    return (
      <p className="empty-text">Click on a playlist to view its details or click on the Playlist's settings icon to view sync settings</p>
    );
  }

  const renderPlaylistInfo = () => {
    return <PlaylistInfo selectedPlaylist={selectedPlaylist} />
  }

  const renderPlaylistSettings = () => {
    return <SyncSettings selectedPlaylist={selectedPlaylist} />
  }

  const renderInfoSection = () => {
    if (selectedPlaylist === null) return renderEmptyInfo();
    const { view } = selectedPlaylist;
    if (view === 'INFO') {
      return renderPlaylistInfo();
    } else if (view === 'SETTINGS') { 
      return renderPlaylistSettings();
    } else {
      return renderEmptyInfo();
    }
  }

  return (
    <div className='detail-paper'>
      {renderInfoSection()}
    </div>
  );
}

export default InfoSection;