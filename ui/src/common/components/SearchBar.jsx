import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import map from 'lodash/map';
import head from 'lodash/head';
import LoadingIcon from '../../images/spinning-circles.svg';
const axios = require('axios');

const SearchBar = ({ searchOpen, setSearchOpen, onAdd, onInfo }) => {
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [cookies] = useCookies();
  const [fetchedPlaylists, setFetchedPlaylists] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const getSearchClass = () => searchOpen ? 'open' : 'closed';
  const getContentClass = () => `search-results-container search-results-container--${fetchedPlaylists.length !== 0 ? 'open' : 'closed'}`;


  const [searchTerm, setSearchTerm] = useState('');

  const setSearchTermAndQuerySearch = (e) => {
    const searchValue = e.target.value;

    setSearchTerm(searchValue);
    // Clear the existing timeout if it exists
    clearTimeout(searchTimeout);

    if (searchValue === '') {
      setFetchedPlaylists([]);
      return;
    }

    const timeoutFn = setTimeout(() => {
      setIsSearching(true);
      const { SpotifyBearer } = cookies;
      axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: searchValue,
          type: 'playlist'
        },
        headers: {
          Authorization: `Bearer ${SpotifyBearer}`
        }
      }).then((res) => {
        setTimeout(setIsSearching(false), 2000);
        setFetchedPlaylists(res.data.playlists.items);
      }).catch((err) => {
        console.log(err);
      });
    }, 1000);

    setSearchTimeout(timeoutFn);
  };

  useEffect(() => {
    if (searchOpen === false) {
      clearSearch();
    }
  }, [searchOpen]);

  const clearSearch = (e) => {
    setFetchedPlaylists([]);
    setSearchTerm('');
  }

  const handleInfoButtonClick = (playlist) => {
    onInfo(playlist);
  }

  const handleAddButtonClick = (playlist, e) => {
    e.stopPropagation();
    onAdd(playlist);
  }

  const renderFetchedPlaylists = () => {
    return map(fetchedPlaylists, playlist => {
      const { name, images, id } = playlist;
      const imageUrl = head(images).url;
      return (
        <div className='search-item-container' key={id} onClick={() => handleInfoButtonClick(playlist)}>
          <img className='search-item-image' src={imageUrl} />
          <div className='search-item-content'>
            <div className='search-name-button-container'>
              <div className='item-name'>{name}</div>
              <div className='button-container'>
                <button id="addButton" onClick={(e) => handleAddButtonClick(playlist, e)}><i className="fas fa-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
      )
    });
  }

  return (
    <div className={`search-root ${getSearchClass()}`} onFocus={() => setSearchOpen(true)}>
      <div className='search-content-container'>
        <i id="search-icon" className="fas fa-search"></i>
        <input className="search-input" placeholder={"Search for a playlist"} onChange={setSearchTermAndQuerySearch} value={searchTerm}></input>
        {searchTerm.length > 0 && <button id="closeButton" onClick={clearSearch}>Clear</button>}
      </div>
      <div className={getContentClass()}>
        {isSearching && <img src={LoadingIcon} />}
        {renderFetchedPlaylists()}
      </div>
    </div >
  );
}

export default SearchBar;