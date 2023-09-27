import "./App.css";
import SignUp from "./SignUp";
import Home from "./Components/Home";
import React, { useState } from "react";
import SignIn from "./Components/SignIn";
import Navbar from "./Components/Navbar";
import Artist from "./Components/Artist";
import Podcasts from "./Components/Podcasts";
import Playlist from "./Components/Playlist";
import NotSignIn from "./Components/NotSignIn";
import Searchbar from "./Components/Searchbar";
import Favorites from "./Components/Favorites";
import SearchPage from "./Components/SearchPage";
import SearchAlbum from "./Components/SearchAlbum";
import Subscription from "./Components/Subscription";
import NoResultsFound from "./Components/NoResultsFound";
import TrendingPlaylist from "./Components/TrendingPlaylist";
import SearchComponents from "./Components/SearchComponents";
import ShowSearchResults from "./Components/ShowSearchResults";
import MusicPlayerComponents from "./Components/MusicPlayerComponents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [useName, setUserName] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [songPlayId, setSongPlayId] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [showMusic, setShowMusic] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [hoverStates, setHoverStates] = useState(
    Array(Array.length).fill(false)
  );

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleNotShow = () => {
    setShowNav(false);
  };
  const handleShowNav = () => {
    setShowNav(true);
  };
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  function updateSongPlayId(id) {
    setSongPlayId(id);
  }
  const handleNotShowSearch = () => {
    setShowSearch(false);
  };
  const handleTextToSearch = (e) => {
    setSearchItem(e.target.value);
  };
  const handleInputValueToSearch = (e) => {
    e.preventDefault();
    setSearchItem("");
  };
  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };
  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  return (
    <div className="App">
      <Router>
        {songPlayId && showMusic && (
          <MusicPlayerComponents songPlayId={songPlayId} />
        )}
        {showSearch && (
          <Searchbar
            searchItem={searchItem}
            handleShowNav={handleShowNav}
            handleTextToSearch={handleTextToSearch}
            handleNotShowSearch={handleNotShowSearch}
            handleInputValueToSearch={handleInputValueToSearch}
          />
        )}
        {showNav && (
          <Navbar
            useName={useName}
            searchItem={searchItem}
            signSuccess={signSuccess}
            handleNotShow={handleNotShow}
            setSignSuccess={setSignSuccess}
            handleShowSearch={handleShowSearch}
            handleTextToSearch={handleTextToSearch}
            handleInputValueToSearch={handleInputValueToSearch}
          />
        )}
        <Routes>
          <Route path="/searchpage" element={<SearchPage />} />
          <Route
            path="notsignin"
            element={<NotSignIn handleNotShow={handleNotShow} />}
          />
          <Route
            path="noresultfound"
            element={<NoResultsFound searchItem={searchItem} />}
          />
          <Route
            path="searchcomponents"
            element={<SearchComponents searchItem={searchItem} />}
          />
          <Route
            path="/subscription"
            Component={() => {
              setShowMusic(false);
              return <Subscription handleNotShow={handleNotShow} />;
            }}
          />
          <Route
            path="/podcasts"
            element={
              <Podcasts
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorites
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="playlist/:id"
            element={
              <Playlist
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                handleShowNav={handleShowNav}
                togglePlayPause={togglePlayPause}
                handleNotShowSearch={handleNotShowSearch}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="signin"
            Component={() => {
              setShowMusic(false);
              return (
                <SignIn
                  signSuccess={signSuccess}
                  setUserName={setUserName}
                  handleNotShow={handleNotShow}
                  setSignSuccess={setSignSuccess}
                />
              );
            }}
          />
          <Route
            path="signup"
            Component={() => {
              setShowMusic(false);
              return (
                <SignUp
                  signSuccess={signSuccess}
                  setUserName={setUserName}
                  handleNotShow={handleNotShow}
                  setSignSuccess={setSignSuccess}
                />
              );
            }}
          />
          <Route
            path="showsearchresults"
            element={
              <ShowSearchResults
                searchItem={searchItem}
                hoverStates={hoverStates}
              />
            }
          />
          <Route
            path="trendingplaylist"
            element={
              <TrendingPlaylist
                isPlaying={isPlaying}
                hoverStates={hoverStates}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
          <Route
            path="searchalbum"
            element={
              <SearchAlbum
                isPlaying={isPlaying}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
                handleNotShowSearch={handleNotShowSearch}
              />
            }
          />
          <Route
            path="artist"
            element={
              <Artist
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                updateSongPlayCallback={updateSongPlayId}
                handleNotShowSearch={handleNotShowSearch}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                isPlaying={isPlaying}
                signSuccess={signSuccess}
                hoverStates={hoverStates}
                handleShowNav={handleShowNav}
                setSearchItem={setSearchItem}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                updateSongPlayCallback={updateSongPlayId}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
