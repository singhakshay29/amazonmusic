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
import Favorites from "./Components/Favorites";
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
  const [signSuccess, setSignSuccess] = useState(false);
  const [hoverStates, setHoverStates] = useState(
    Array(Array.length).fill(false)
  );

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
  const handleTextToSearch = (e) => {
    setSearchItem(e.target.value);
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
  const handleInputValueToSearch = (e) => {
    e.preventDefault();
    setSearchItem("");
  };

  return (
    <div className="App">
      <Router>
        {songPlayId && showMusic && (
          <MusicPlayerComponents songPlayId={songPlayId} />
        )}
        {showNav && (
          <Navbar
            searchItem={searchItem}
            handleTextToSearch={handleTextToSearch}
            handleInputValueToSearch={handleInputValueToSearch}
            signSuccess={signSuccess}
            useName={useName}
            setSignSuccess={setSignSuccess}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                isPlaying={isPlaying}
                hoverStates={hoverStates}
                handleShowNav={handleShowNav}
                signSuccess={signSuccess}
                setSearchItem={setSearchItem}
              />
            }
          />
          <Route
            path="/podcasts"
            element={
              <Podcasts
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
              />
            }
          />
          <Route
            path="/subscription"
            Component={() => {
              setShowMusic(false);
              return <Subscription handleNotShow={handleNotShow} />;
            }}
          />
          <Route
            path="playlist/:id"
            element={
              <Playlist
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
                signSuccess={signSuccess}
              />
            }
          />
          <Route
            path="signin"
            Component={() => {
              setShowMusic(false);
              return (
                <SignIn
                  handleNotShow={handleNotShow}
                  setSignSuccess={setSignSuccess}
                  signSuccess={signSuccess}
                  setUserName={setUserName}
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
                  handleNotShow={handleNotShow}
                  setSignSuccess={setSignSuccess}
                  signSuccess={signSuccess}
                  setUserName={setUserName}
                />
              );
            }}
          />
          <Route
            path="favorites"
            element={
              <Favorites
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
              />
            }
          />
          <Route
            path="searchalbum"
            element={
              <SearchAlbum
                setSearchItem={setSearchItem}
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
              />
            }
          />
          <Route
            path="artist"
            element={
              <Artist
                setSearchItem={setSearchItem}
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
                signSuccess={signSuccess}
              />
            }
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
            path="trendingplaylist"
            element={
              <TrendingPlaylist
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
                hoverStates={hoverStates}
              />
            }
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
            path="notsignin"
            element={<NotSignIn handleNotShow={handleNotShow} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
