import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck'

const SyncSetting = ({ selectedPlaylist }) => {
  console.log(selectedPlaylist);
  const { playlist } = selectedPlaylist;
  return (
    <div className="sync-settings-root">
      <div className="title-container">
        <span className="tracks-title-label">Advanced Settings</span>
      </div>
      <div className="meta-data-container">
        <span>Created At: 11/20/20</span>
        <span>Modified At: 11/20/20</span>
      </div>
      <div className="settings-container">
        <div className="settings-item-container">
          <div className="title-subtitle-row">
            <span className="tracks-title-label small">Target Playlist Name</span>
            <span className="tracks-subtitle-label">The name of the playlist on Apple Music</span>
          </div>
          <input className="settings-input"></input>
        </div>
        <div className="settings-item-container">
          <div className="title-subtitle-row">
            <span className="tracks-title-label small">Include Explicit</span>
            <span className="tracks-subtitle-label">Whether the playlist is to contain explicit tracks</span>
          </div>
          <div className="input-container">
            <input className="radio-input" type="checkbox" name="explicit" value="true"></input>
            <span>Explicit Included</span>
          </div>
        </div>
        <div className="settings-item-container">
          <div className="title-subtitle-row">
            <span className="tracks-title-label small">Sync Regularity</span>
            <span className="tracks-subtitle-label">How often the playlist is synced</span>
          </div>
          <div className="input-container">
            <input className="radio-input" type="checkbox" name="explicit" value="true"></input>
            <span>Daily</span>
            <input className="radio-input" type="checkbox" name="explicit" value="true"></input>
            <span>Weekly</span>
            <input className="radio-input" type="checkbox" name="explicit" value="true"></input>
            <span>Monthly</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyncSetting;