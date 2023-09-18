import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Podcasts from "./Components/Podcasts";
import Subscription from "./Components/Subscription";
import Playlist from "./Components/Playlist";
import "./App.css";
import MusicPlayerComponents from "./Components/MusicPlayerComponents";
import SignIn from "./Components/SignIn";
import SignUp from "./SignUp";
import TrendingPlaylist from "./Components/TrendingPlaylist";
import NoResultsFound from "./Components/NoResultsFound";
import SearchComponents from "./Components/SearchComponents";
import ShowSearchResults from "./Components/ShowSearchResults";
import Favorites from "./Components/Favorites";
import SearchAlbum from "./Components/SearchAlbum";
import Artist from "./Components/Artist";
import NotSignIn from "./Components/NotSignIn";

function App() {
  const [songPlayId, setSongPlayId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [hoverStates, setHoverStates] = useState(
    Array(Array.length).fill(false)
  );
  const [signSuccess, setSignSuccess] = useState(false);

  const handleNotShow = () => {
    setShowNav(false);
  };
  const handleShowNav = () => {
    setShowNav(true);
  };
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
  const handleTextToSearch = (e) => {
    setSearchItem(e.target.value);
  };
  const handleInputValueToSearch = (e) => {
    e.preventDefault();
    setSearchItem("");
  };

  function updateSongPlayId(id) {
    setSongPlayId(id);
  }

  return (
    <div className="App">
      <Router>
        {songPlayId && <MusicPlayerComponents songPlayId={songPlayId} />}
        {showNav && (
          <Navbar
            searchItem={searchItem}
            handleTextToSearch={handleTextToSearch}
            handleInputValueToSearch={handleInputValueToSearch}
            signSuccess={signSuccess}
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
            element={<Subscription handleNotShow={handleNotShow} />}
          />
          <Route
            path="playlist/:id"
            element={
              <Playlist
                updateSongPlayCallback={updateSongPlayId}
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
              />
            }
          />
          <Route
            path="signin"
            element={
              <SignIn
                handleNotShow={handleNotShow}
                setSignSuccess={setSignSuccess}
                signSuccess={signSuccess}
              />
            }
          />
          <Route
            path="signup"
            element={
              <SignUp
                handleNotShow={handleNotShow}
                setSignSuccess={setSignSuccess}
                signSuccess={signSuccess}
              />
            }
          />
          <Route path="favorites" element={<Favorites />} />
          <Route path="searchalbum" element={<SearchAlbum />} />
          <Route path="artist" element={<Artist />} />
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
